#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ROOT_DIR = path.resolve(__dirname, '..');

function runCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'inherit', cwd: ROOT_DIR });
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ ${errorMessage}`));
    console.error(error.message);
    return false;
  }
}

function checkForConsoleStatements() {
  const sourceFiles = execSync('find src -type f -name "*.ts*"', { cwd: ROOT_DIR })
    .toString()
    .split('\n')
    .filter(Boolean);

  let found = false;
  for (const file of sourceFiles) {
    const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
    if (content.match(/console\.(log|debug|info)/)) {
      console.error(chalk.yellow(`⚠️ Console statement found in ${file}`));
      found = true;
    }
  }
  return !found;
}

function checkEnvironmentVariables() {
  const requiredVars = ['VITE_GOOGLE_CLIENT_ID'];
  const missingVars = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.error(chalk.red('❌ Missing environment variables:'));
    missingVars.forEach(v => console.error(chalk.red(`   - ${v}`)));
    return false;
  }
  return true;
}

function checkBundleSize() {
  // Build the project
  runCommand('npm run build', 'Build failed');

  const distDir = path.join(ROOT_DIR, 'dist');
  const maxSizeKB = 1000; // 1MB limit for main bundle
  
  const files = fs.readdirSync(distDir);
  const mainBundle = files.find(f => f.match(/^index.*\.js$/));
  
  if (!mainBundle) {
    console.error(chalk.red('❌ Could not find main bundle'));
    return false;
  }

  const stats = fs.statSync(path.join(distDir, mainBundle));
  const sizeKB = stats.size / 1024;

  if (sizeKB > maxSizeKB) {
    console.error(chalk.red(`❌ Main bundle size (${Math.round(sizeKB)}KB) exceeds limit (${maxSizeKB}KB)`));
    return false;
  }
  
  console.log(chalk.green(`✅ Bundle size: ${Math.round(sizeKB)}KB`));
  return true;
}

async function main() {
  console.log(chalk.blue('Running pre-deployment checks...\n'));

  let success = true;

  // Check TypeScript
  console.log(chalk.cyan('Checking TypeScript...'));
  success &= runCommand('npm run type-check', 'TypeScript check failed');

  // Check ESLint
  console.log(chalk.cyan('\nRunning ESLint...'));
  success &= runCommand('npm run lint', 'ESLint check failed');

  // Check for console.log statements
  console.log(chalk.cyan('\nChecking for console statements...'));
  success &= checkForConsoleStatements();

  // Check environment variables
  console.log(chalk.cyan('\nChecking environment variables...'));
  success &= checkEnvironmentVariables();

  // Run tests
  console.log(chalk.cyan('\nRunning tests...'));
  success &= runCommand('npm test', 'Tests failed');

  // Check bundle size
  console.log(chalk.cyan('\nChecking bundle size...'));
  success &= checkBundleSize();

  // Run QA checks
  console.log(chalk.cyan('\nRunning QA checks...'));
  success &= runCommand('node scripts/qa_check.js', 'QA checks failed');

  if (success) {
    console.log(chalk.green('\n✅ All pre-deployment checks passed!'));
    process.exit(0);
  } else {
    console.error(chalk.red('\n❌ Some checks failed. Please fix the issues before deploying.'));
    process.exit(1);
  }
}

main().catch(error => {
  console.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});

#!/usr/bin/env node

const https = require('https');
const chalk = require('chalk');

const APP_URL = 'https://prettymail-m5z0yw0fx-liad-gezs-projects.vercel.app';

function checkEndpoint(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          size: Buffer.from(data).length
        });
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log(chalk.blue('Running application health check...\n'));

  try {
    // Check main application endpoint
    console.log(chalk.cyan('Checking main application...'));
    const mainCheck = await checkEndpoint(APP_URL);
    
    if (mainCheck.statusCode === 200) {
      console.log(chalk.green(`✅ Main application responding (${mainCheck.statusCode})`));
      console.log(chalk.gray(`   Size: ${Math.round(mainCheck.size / 1024)}KB`));
      console.log(chalk.gray(`   Content-Type: ${mainCheck.headers['content-type']}`));
    } else {
      console.error(chalk.red(`❌ Main application error (${mainCheck.statusCode})`));
    }

    // Check HTTPS
    console.log(chalk.cyan('\nVerifying HTTPS...'));
    if (mainCheck.headers['strict-transport-security']) {
      console.log(chalk.green('✅ HTTPS properly configured with HSTS'));
    } else {
      console.log(chalk.yellow('⚠️ HSTS header missing'));
    }

    // Check security headers
    console.log(chalk.cyan('\nChecking security headers...'));
    const securityHeaders = {
      'content-security-policy': 'Content Security Policy',
      'x-frame-options': 'X-Frame-Options',
      'x-content-type-options': 'X-Content-Type-Options',
      'x-xss-protection': 'X-XSS-Protection'
    };

    for (const [header, name] of Object.entries(securityHeaders)) {
      if (mainCheck.headers[header]) {
        console.log(chalk.green(`✅ ${name} configured`));
      } else {
        console.log(chalk.yellow(`⚠️ ${name} missing`));
      }
    }

    // Performance checks
    console.log(chalk.cyan('\nChecking response times...'));
    const start = Date.now();
    await checkEndpoint(APP_URL);
    const responseTime = Date.now() - start;

    if (responseTime < 1000) {
      console.log(chalk.green(`✅ Response time: ${responseTime}ms`));
    } else {
      console.log(chalk.yellow(`⚠️ Response time high: ${responseTime}ms`));
    }

    // Summary
    console.log(chalk.cyan('\nHealth Check Summary:'));
    console.log(chalk.white('- Application Status: ') + (mainCheck.statusCode === 200 ? chalk.green('Healthy') : chalk.red('Unhealthy')));
    console.log(chalk.white('- HTTPS: ') + (mainCheck.headers['strict-transport-security'] ? chalk.green('Secure') : chalk.yellow('Warning')));
    console.log(chalk.white('- Response Time: ') + (responseTime < 1000 ? chalk.green('Good') : chalk.yellow('Warning')));

  } catch (error) {
    console.error(chalk.red('\nError during health check:'));
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);

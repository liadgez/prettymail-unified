const puppeteer = require('puppeteer');
const chalk = require('chalk');

const APP_URL = 'https://prettymail-m5z0yw0fx-liad-gezs-projects.vercel.app';

async function runQAChecks() {
  console.log(chalk.blue('Starting QA checks...'));
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Basic Load Test
    console.log(chalk.yellow('Testing page load...'));
    const startTime = Date.now();
    await page.goto(APP_URL);
    const loadTime = Date.now() - startTime;
    console.log(chalk.green(`Page load time: ${loadTime}ms`));

    // Check Core Elements
    console.log(chalk.yellow('Checking core elements...'));
    const elements = {
      'Sign in button': '[data-testid="google-signin-button"]',
      'Logo': '.logo',
      'Navigation menu': 'nav',
    };

    for (const [name, selector] of Object.entries(elements)) {
      const exists = await page.$(selector);
      console.log(
        exists
          ? chalk.green(`✓ ${name} present`)
          : chalk.red(`✗ ${name} missing`)
      );
    }

    // Responsive Design Check
    console.log(chalk.yellow('Testing responsive design...'));
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1440, height: 900, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewport(viewport);
      await page.reload();
      const horizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      
      console.log(
        horizontalScroll
          ? chalk.red(`✗ Horizontal scroll detected on ${viewport.name}`)
          : chalk.green(`✓ No horizontal scroll on ${viewport.name}`)
      );
    }

    // Performance Metrics
    console.log(chalk.yellow('Collecting performance metrics...'));
    const metrics = await page.metrics();
    console.log(chalk.cyan('Performance Metrics:'));
    console.log(chalk.white('- JS Heap Size:', Math.round(metrics.JSHeapUsedSize / 1024 / 1024), 'MB'));
    console.log(chalk.white('- DOM Nodes:', metrics.Nodes));

    // Network Check
    console.log(chalk.yellow('Checking network requests...'));
    const requests = await page.evaluate(() => 
      performance.getEntriesByType('resource').map(entry => ({
        name: entry.name,
        duration: entry.duration
      }))
    );
    
    const slowRequests = requests.filter(r => r.duration > 1000);
    if (slowRequests.length > 0) {
      console.log(chalk.yellow('Slow requests detected:'));
      slowRequests.forEach(r => console.log(chalk.yellow(`- ${r.name}: ${Math.round(r.duration)}ms`)));
    } else {
      console.log(chalk.green('✓ All network requests within acceptable time'));
    }

  } catch (error) {
    console.error(chalk.red('Error during QA checks:'), error);
  } finally {
    await browser.close();
    console.log(chalk.blue('QA checks completed'));
  }
}

runQAChecks().catch(console.error);

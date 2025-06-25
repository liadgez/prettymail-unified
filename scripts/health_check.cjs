#!/usr/bin/env node

const https = require('https');

const APP_URL = 'https://prettymail-df2gr92a4-liad-gezs-projects.vercel.app';

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
  console.log('🔍 Running application health check...\n');

  try {
    // Check main application endpoint
    console.log('📡 Checking main application...');
    const mainCheck = await checkEndpoint(APP_URL);
    
    if (mainCheck.statusCode === 200) {
      console.log(`✅ Main application responding (${mainCheck.statusCode})`);
      console.log(`   📊 Size: ${Math.round(mainCheck.size / 1024)}KB`);
      console.log(`   📄 Content-Type: ${mainCheck.headers['content-type']}`);
    } else {
      console.error(`❌ Main application error (${mainCheck.statusCode})`);
    }

    // Check HTTPS
    console.log('\n🔒 Verifying HTTPS...');
    if (mainCheck.headers['strict-transport-security']) {
      console.log('✅ HTTPS properly configured with HSTS');
    } else {
      console.log('⚠️ HSTS header missing');
    }

    // Performance checks
    console.log('\n⚡ Checking response times...');
    const start = Date.now();
    await checkEndpoint(APP_URL);
    const responseTime = Date.now() - start;

    if (responseTime < 1000) {
      console.log(`✅ Response time: ${responseTime}ms`);
    } else {
      console.log(`⚠️ Response time high: ${responseTime}ms`);
    }

    // Summary
    console.log('\n📋 Health Check Summary:');
    console.log('- Application Status: ' + (mainCheck.statusCode === 200 ? '✅ Healthy' : '❌ Unhealthy'));
    console.log('- HTTPS: ' + (mainCheck.headers['strict-transport-security'] ? '✅ Secure' : '⚠️ Warning'));
    console.log('- Response Time: ' + (responseTime < 1000 ? '✅ Good' : '⚠️ Warning'));

    console.log('\n🎉 Health check completed successfully!');

  } catch (error) {
    console.error('\n❌ Error during health check:');
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);

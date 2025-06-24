import os from 'os';

console.log('=== Pre-Build Diagnostics ===');
console.log('Node version:', process.version);
console.log('Memory limit:', process.env.NODE_OPTIONS);
console.log('Working directory:', process.cwd());
console.log('Available memory:', (os.freemem() / 1024 / 1024).toFixed(2), 'MB');
console.log('Total memory:', (os.totalmem() / 1024 / 1024).toFixed(2), 'MB');
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('========================');

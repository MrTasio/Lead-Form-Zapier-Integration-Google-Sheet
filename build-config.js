// Build script to generate config.js from environment variables
// This works for both local .env files and Vercel environment variables

const fs = require('fs');
const path = require('path');

// Read from .env file if it exists (local development)
let webhookUrl = process.env.WEBHOOK_URL;

// If no env var, try reading from .env file
if (!webhookUrl && fs.existsSync('.env')) {
    const envFile = fs.readFileSync('.env', 'utf8');
    const match = envFile.match(/^WEBHOOK_URL=(.+)$/m);
    if (match) {
        webhookUrl = match[1].trim();
    }
}

// Fallback for local development
if (!webhookUrl) {
    webhookUrl = 'https://webhook.site/your-unique-url';
    console.warn('⚠️  Warning: WEBHOOK_URL not found. Using default. Please set it in .env or environment variables.');
}

// Generate config.js
const configContent = `// Webhook Configuration
// This file is auto-generated from environment variables
// Do not edit manually - update .env file or Vercel environment variables instead
const CONFIG = {
    WEBHOOK_URL: '${webhookUrl}'
};
`;

// Write config.js
fs.writeFileSync(path.join(__dirname, 'config.js'), configContent, 'utf8');
console.log('✅ config.js generated successfully');
console.log(`   Webhook URL: ${webhookUrl.substring(0, 50)}...`);


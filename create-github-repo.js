#!/usr/bin/env node

// GitHub Repository Creation Script
const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub Repository Creation Helper');
console.log('=====================================');
console.log('');
console.log('This script will help you create a GitHub repository for your crypto bank wireframes.');
console.log('');

// Check if we have a GitHub token
const token = process.env.GITHUB_TOKEN;
if (!token) {
    console.log('❌ No GitHub token found.');
    console.log('');
    console.log('To create the repository automatically, you need a GitHub Personal Access Token:');
    console.log('1. Go to https://github.com/settings/tokens');
    console.log('2. Generate new token (classic)');
    console.log('3. Select scope: "repo"');
    console.log('4. Copy the token');
    console.log('5. Run: export GITHUB_TOKEN=your_token_here');
    console.log('6. Run this script again');
    console.log('');
    console.log('Or follow the manual steps below:');
    console.log('');
    console.log('📋 Manual Steps:');
    console.log('1. Go to https://github.com/new');
    console.log('2. Repository name: crypto-bank-wireframes');
    console.log('3. Description: Interactive crypto bank mobile app wireframes with 23 screens');
    console.log('4. Set to PUBLIC');
    console.log('5. DO NOT initialize with README');
    console.log('6. Click "Create repository"');
    console.log('');
    console.log('📝 Then run these commands:');
    console.log('git remote add origin https://github.com/YOUR_USERNAME/crypto-bank-wireframes.git');
    console.log('git push -u origin main');
    console.log('');
    console.log('🌐 Enable GitHub Pages:');
    console.log('1. Go to repository Settings → Pages');
    console.log('2. Source: Deploy from a branch');
    console.log('3. Branch: main, Folder: / (root)');
    console.log('4. Save');
    console.log('');
    console.log('🎉 Your site will be live at:');
    console.log('https://YOUR_USERNAME.github.io/crypto-bank-wireframes/');
    process.exit(0);
}

// Repository data
const repoData = {
    name: 'crypto-bank-wireframes',
    description: 'Interactive crypto bank mobile app wireframes with 23 screens',
    private: false,
    auto_init: false
};

const postData = JSON.stringify(repoData);

const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user/repos',
    method: 'POST',
    headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Crypto-Bank-Wireframes',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🔄 Creating GitHub repository...');

const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        if (res.statusCode === 201) {
            const repo = JSON.parse(data);
            console.log('✅ Repository created successfully!');
            console.log(`📁 Repository URL: ${repo.html_url}`);
            console.log(`🌐 Clone URL: ${repo.clone_url}`);
            console.log('');
            console.log('📝 Next steps:');
            console.log(`git remote add origin ${repo.clone_url}`);
            console.log('git push -u origin main');
            console.log('');
            console.log('🌐 Enable GitHub Pages:');
            console.log('1. Go to repository Settings → Pages');
            console.log('2. Source: Deploy from a branch');
            console.log('3. Branch: main, Folder: / (root)');
            console.log('4. Save');
            console.log('');
            console.log(`🎉 Your site will be live at:`);
            console.log(`https://${repo.owner.login}.github.io/crypto-bank-wireframes/`);
        } else {
            console.log('❌ Failed to create repository');
            console.log('Response:', data);
            console.log('');
            console.log('Please try the manual steps instead.');
        }
    });
});

req.on('error', (e) => {
    console.log('❌ Error:', e.message);
    console.log('');
    console.log('Please try the manual steps instead.');
});

req.write(postData);
req.end();

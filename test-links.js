// Automated Link Testing Script for Crypto Bank Wireframes
// Run with: node test-links.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8000';
const visited = new Set();
const errors = [];
const success = [];

// Function to fetch a URL
async function fetchPage(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        }).on('error', reject);
    });
}

// Extract links from HTML
function extractLinks(html) {
    const linkRegex = /(?:href|onclick.*location\.href)=['"]([^'"#]+(?:\.html)?)['"]/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
        const link = match[1];
        if (link.endsWith('.html') && !link.startsWith('http')) {
            links.push(link);
        }
    }
    
    return [...new Set(links)]; // Remove duplicates
}

// Test a page and its links
async function testPage(pageName, depth = 0) {
    if (visited.has(pageName) || depth > 2) return;
    visited.add(pageName);
    
    const indent = '  '.repeat(depth);
    const url = `${BASE_URL}/${pageName}`;
    
    try {
        console.log(`${indent}Testing: ${pageName}`);
        const result = await fetchPage(url);
        
        if (result.status === 200) {
            success.push({ page: pageName, status: result.status });
            console.log(`${indent}  ✅ OK (${result.status})`);
            
            // Extract and test links
            const links = extractLinks(result.data);
            console.log(`${indent}  Found ${links.length} links`);
            
            for (const link of links) {
                await testPage(link, depth + 1);
            }
        } else {
            errors.push({ page: pageName, status: result.status, error: 'Non-200 status' });
            console.log(`${indent}  ❌ Error ${result.status}`);
        }
    } catch (err) {
        errors.push({ page: pageName, error: err.message });
        console.log(`${indent}  ❌ Error: ${err.message}`);
    }
}

// Main test function
async function runTests() {
    console.log('🧪 Starting Link Tests for Crypto Bank Wireframes\n');
    console.log('=' .repeat(60));
    console.log('Testing all pages starting from index.html\n');
    
    await testPage('index.html');
    
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Test Results:\n');
    console.log(`✅ Successful pages: ${success.length}`);
    console.log(`❌ Errors: ${errors.length}\n`);
    
    if (errors.length > 0) {
        console.log('❌ Errors found:\n');
        errors.forEach(err => {
            console.log(`  - ${err.page}: ${err.error || err.status}`);
        });
    } else {
        console.log('🎉 All tests passed! All links are working correctly.');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('\n📋 All tested pages:');
    Array.from(visited).sort().forEach(page => {
        console.log(`  ✓ ${page}`);
    });
    
    // Save results to file
    const report = {
        timestamp: new Date().toISOString(),
        totalPages: visited.size,
        successCount: success.length,
        errorCount: errors.length,
        pages: Array.from(visited),
        errors: errors
    };
    
    fs.writeFileSync('test-results.json', JSON.stringify(report, null, 2));
    console.log('\n📝 Results saved to test-results.json');
}

// Run tests
runTests().catch(console.error);






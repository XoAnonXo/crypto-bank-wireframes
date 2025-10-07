#!/bin/bash

# Complete GitHub Pages Deployment Script
echo "🚀 Complete GitHub Pages Deployment for Crypto Bank Wireframes"
echo "=============================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the Figma directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📋 Repository status:"
git status --short
echo ""

echo "🔧 Step 1: Create GitHub Repository"
echo "=================================="
echo ""
echo "Please follow these steps:"
echo "1. Open your browser and go to: https://github.com/new"
echo "2. Repository name: crypto-bank-wireframes"
echo "3. Description: Interactive crypto bank mobile app wireframes with 23 screens"
echo "4. Set to PUBLIC"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
echo "Press Enter when you've created the repository..."
read -r

echo ""
echo "🔧 Step 2: Get Your GitHub Username"
echo "=================================="
echo "Please enter your GitHub username:"
read -r GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

echo ""
echo "🔧 Step 3: Connect and Push to GitHub"
echo "===================================="

# Remove existing origin if it exists
git remote remove origin 2>/dev/null || true

# Add the new origin
git remote add origin "https://github.com/$GITHUB_USERNAME/crypto-bank-wireframes.git"

echo "✅ Remote added: https://github.com/$GITHUB_USERNAME/crypto-bank-wireframes.git"

# Push to GitHub
echo "🔄 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your repository URL and try again"
    exit 1
fi

echo ""
echo "🔧 Step 4: Enable GitHub Pages"
echo "============================="
echo ""
echo "Now enable GitHub Pages:"
echo "1. Go to: https://github.com/$GITHUB_USERNAME/crypto-bank-wireframes"
echo "2. Click the 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Under 'Source', select 'Deploy from a branch'"
echo "5. Select 'main' branch"
echo "6. Select '/ (root)' folder"
echo "7. Click 'Save'"
echo ""
echo "Press Enter when you've enabled GitHub Pages..."
read -r

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "Your crypto bank wireframes are now live at:"
echo "https://$GITHUB_USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "📱 What's available:"
echo "- 23 interactive wireframe screens"
echo "- Mobile-optimized design (375x812px)"
echo "- Navigation hub with all screens"
echo "- Test checklist and visual testing tools"
echo "- Complete documentation"
echo ""
echo "🔗 Current access methods:"
echo "- Local: http://localhost:8000"
echo "- Public tunnel: https://violet-boats-argue.loca.lt"
echo "- GitHub Pages: https://$GITHUB_USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "✅ All deployment methods are now active!"
echo ""
echo "📧 Share with your team:"
echo "Hi team! Check out our crypto bank wireframes:"
echo "https://$GITHUB_USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "Features:"
echo "- 23 interactive screens"
echo "- Swipeable dashboard"
echo "- Complete deposit flow"
echo "- Wallet/Vault management"
echo "- All interactions working"
echo ""
echo "Enjoy your live wireframes! 🚀"

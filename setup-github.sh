#!/bin/bash

# GitHub Pages Setup Script for Crypto Bank Wireframes
echo "🚀 Setting up GitHub Pages for Crypto Bank Wireframes..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the Figma directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📋 Files ready for deployment:"
ls -la *.html *.css *.md | head -10

echo ""
echo "🔧 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: crypto-bank-wireframes"
echo "3. Description: Interactive crypto bank mobile app wireframes with 23 screens"
echo "4. Set to PUBLIC"
echo "5. DO NOT initialize with README"
echo "6. Click 'Create repository'"
echo ""
echo "📝 After creating the repository, run these commands:"
echo "git remote add origin https://github.com/YOUR_USERNAME/crypto-bank-wireframes.git"
echo "git push -u origin main"
echo ""
echo "🌐 Then enable GitHub Pages:"
echo "1. Go to repository Settings → Pages"
echo "2. Source: Deploy from a branch"
echo "3. Branch: main, Folder: / (root)"
echo "4. Save"
echo ""
echo "🎉 Your site will be live at:"
echo "https://YOUR_USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "✅ Repository is ready with:"
echo "- 23 interactive wireframe screens"
echo "- Mobile-optimized design"
echo "- Test checklist and tools"
echo "- Complete documentation"
echo ""
echo "Current status:"
echo "- Local server: http://localhost:8000"
echo "- Public tunnel: https://violet-boats-argue.loca.lt"
echo "- Git repository: Ready for GitHub push"

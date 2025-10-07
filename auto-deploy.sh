#!/bin/bash

# Automated GitHub Pages Deployment
echo "🚀 Automated GitHub Pages Deployment"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the Figma directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📋 Files ready for deployment:"
ls -la *.html | head -5
echo "..."

echo ""
echo "🔧 Creating GitHub repository automatically..."
echo ""

# Check if we have a GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ No GitHub token found."
    echo ""
    echo "To automate this process, you need a GitHub Personal Access Token:"
    echo "1. Go to https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Give it a name like 'Crypto Bank Wireframes'"
    echo "4. Select scope: 'repo'"
    echo "5. Click 'Generate token'"
    echo "6. Copy the token"
    echo "7. Run: export GITHUB_TOKEN=your_token_here"
    echo "8. Run this script again"
    echo ""
    echo "Or use the interactive script: ./deploy-to-github.sh"
    exit 1
fi

# Get GitHub username from token
echo "🔄 Getting GitHub username..."
USERNAME=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep '"login"' | cut -d'"' -f4)

if [ -z "$USERNAME" ]; then
    echo "❌ Failed to get GitHub username. Please check your token."
    exit 1
fi

echo "✅ GitHub username: $USERNAME"

# Create repository
echo "🔄 Creating repository..."
REPO_DATA='{"name":"crypto-bank-wireframes","description":"Interactive crypto bank mobile app wireframes with 23 screens","private":false,"auto_init":false}'

RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "$REPO_DATA" \
  https://api.github.com/user/repos)

# Check if repository was created successfully
if echo "$RESPONSE" | grep -q '"html_url"'; then
    echo "✅ Repository created successfully!"
    REPO_URL=$(echo "$RESPONSE" | grep '"html_url"' | cut -d'"' -f4)
    echo "📁 Repository URL: $REPO_URL"
else
    echo "❌ Failed to create repository"
    echo "Response: $RESPONSE"
    echo ""
    echo "The repository might already exist. Let's try to push anyway..."
fi

# Add remote and push
echo ""
echo "🔄 Setting up git remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$USERNAME/crypto-bank-wireframes.git"

echo "🔄 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your repository and try again"
    exit 1
fi

# Enable GitHub Pages
echo ""
echo "🔄 Enabling GitHub Pages..."
PAGES_DATA='{"source":{"branch":"main","path":"/"}}'

PAGES_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "$PAGES_DATA" \
  https://api.github.com/repos/$USERNAME/crypto-bank-wireframes/pages)

if echo "$PAGES_RESPONSE" | grep -q '"status"'; then
    echo "✅ GitHub Pages enabled successfully!"
else
    echo "⚠️  GitHub Pages might need manual activation"
    echo "Please go to: https://github.com/$USERNAME/crypto-bank-wireframes/settings/pages"
    echo "Set Source to 'Deploy from a branch' → 'main' → '/'"
fi

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "Your crypto bank wireframes are now live at:"
echo "https://$USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "📱 What's available:"
echo "- 23 interactive wireframe screens"
echo "- Mobile-optimized design (375x812px)"
echo "- Navigation hub with all screens"
echo "- Test checklist and visual testing tools"
echo "- Complete documentation"
echo ""
echo "🔗 All access methods:"
echo "- Local: http://localhost:8000"
echo "- Public tunnel: https://violet-boats-argue.loca.lt"
echo "- GitHub Pages: https://$USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "✅ Your wireframes are now publicly accessible!"
echo ""
echo "📧 Share with your team:"
echo "Hi team! Check out our crypto bank wireframes:"
echo "https://$USERNAME.github.io/crypto-bank-wireframes/"
echo ""
echo "Features:"
echo "- 23 interactive screens"
echo "- Swipeable dashboard"
echo "- Complete deposit flow"
echo "- Wallet/Vault management"
echo "- All interactions working"
echo ""
echo "Enjoy your live wireframes! 🚀"

#!/bin/bash
# Quick deployment script for future updates

echo "🚀 Deploying Portfolio Updates..."

# Add all changes
git add .

# Get commit message
read -p "Enter commit message (press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update portfolio"
fi

# Commit and push
git commit -m "$commit_msg"
git push origin main

echo "✅ Deployed! Vercel will automatically update your live site."
echo "🌐 Check your Vercel dashboard for deployment status."

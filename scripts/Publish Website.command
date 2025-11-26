#!/bin/bash

# Horizon Heights Website Publisher
# Double-click or run this script to publish your changes to the live site.

echo "========================================"
echo "  Horizon Heights Website Publisher"
echo "========================================"
echo ""
echo "Syncing your local changes to the live site..."
echo ""

# Navigate to the project directory
cd "$(dirname "$0")"

# Check for changes
if [[ -z $(git status -s) ]]; then
    echo "No changes found to publish."
    echo "Make some edits to your files first!"
    echo ""
    read -n 1 -s -r -p "Press any key to close..."
    exit 0
fi

# AUTOMATION: Update Gallery
echo "Scanning for new gallery images..."
python3 update_gallery.py
echo ""

# Add all changes
git add .

# Ask for a simple description of changes
echo "Enter a brief description of your changes (e.g., 'Updated pricing' or 'Added new photos'):"
read -r commit_message

if [[ -z "$commit_message" ]]; then
    commit_message="Update website content"
fi

# Commit changes
git commit -m "$commit_message"

# Push to GitHub (which triggers Netlify deploy)
echo ""
echo "Uploading to GitHub..."
git push origin master

echo ""
echo "========================================"
echo "  SUCCESS! 🚀"
echo "========================================"
echo "Your changes have been pushed."
echo "Netlify will automatically deploy them in a few seconds."
echo "Visit: https://cosmic-dango-297d1e.netlify.app"
echo ""
read -n 1 -s -r -p "Press any key to close..."

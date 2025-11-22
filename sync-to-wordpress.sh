#!/bin/bash

# Horizon Heights Productions - WordPress Sync Script
# This script syncs your local files to your WordPress site automatically using Cyberduck CLI

echo "🚀 Starting sync to WordPress..."
echo "📁 Local folder: /Users/justinkeith/Desktop/HorizonHeightsWebsite"
echo "🌐 Remote: horizon-heights-theme folder"
echo ""

# Use Cyberduck CLI (duck command) for syncing
/Applications/Cyberduck.app/Contents/MacOS/duck \
    --username jkeith3725.wordpress.com \
    --password 1ztHc8O40IdZUD8FI3RG \
    --synchronize \
    --upload \
    --delete \
    --exclude ".DS_Store" \
    --exclude "sync-to-wordpress.sh" \
    --exclude "SFTP_CREDENTIALS.txt" \
    "sftp://sftp.wp.com:22/wp-content/themes/horizon-heights-theme/" \
    "/Users/justinkeith/Desktop/HorizonHeightsWebsite/"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Sync complete! Your website is now updated."
    echo "🌐 Visit: https://horizonheightsproductions.com"
else
    echo ""
    echo "❌ Sync failed. Please check the output above."
fi

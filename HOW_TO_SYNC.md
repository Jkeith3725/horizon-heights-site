# Horizon Heights Website - WordPress Sync Guide

## 🎯 Your Goal
Edit files in `/Users/justinkeith/Desktop/HorizonHeightsWebsite/` and have them appear on your live WordPress site automatically.

---

## ✅ EASIEST METHOD: Cyberduck Synchronize Feature

Since you already have Cyberduck connected, here's the simplest workflow:

### One-Time Setup:

1. **In Cyberduck**, make sure you're viewing the `horizon-heights-theme` folder
   - Path: `/wp-content/themes/horizon-heights-theme/`

2. **Click the "Action" button** (gear icon) at the bottom of Cyberduck

3. **Select "Synchronize..."** from the menu

4. **In the dialog that appears:**
   - **Remote folder:** Should already be set to `horizon-heights-theme`
   - **Local folder:** Click "Choose" → Navigate to `/Users/justinkeith/Desktop/HorizonHeightsWebsite`
   - **Direction:** Select "Upload" (arrow pointing up)
   - **Options:** Check "Delete files on server that don't exist locally" (optional but keeps things clean)

5. **Create a Bookmark:**
   - After configuring, click the bookmark icon to save this sync configuration
   - Name it "Horizon Heights Sync"

### Daily Workflow:

**Option A - Manual Sync (Recommended to start):**
1. Edit files in your `/HorizonHeightsWebsite/` folder
2. Open Cyberduck
3. Double-click your "Horizon Heights Sync" bookmark
4. Click "Continue" to sync
5. Done! Changes are live.

**Option B - Keep Cyberduck Open (Auto-sync):**
1. In Cyberduck Preferences → Transfers
2. Enable "Auto-reconnect" and "Upload" options
3. Keep Cyberduck running in background
4. Edit files → They sync automatically

---

## 🚀 ALTERNATIVE: Command-Line Sync (For Advanced Users)

I've created a script, but WordPress.com's SFTP has authentication limitations that prevent automated scripting without additional tools.

**If you want fully automated syncing**, you have two options:

### Option 1: Switch to Regular WordPress Hosting
- Hosts like SiteGround, Bluehost, or WP Engine offer standard SFTP
- This would allow automated rsync/lftp scripts
- Cost: ~$10-30/month

### Option 2: Use GitHub + WordPress Deployment Plugin
- Store your site in GitHub
- Use a WordPress plugin like "GitHub Updater" or "WP Pusher"
- Push git changes → Site updates automatically
- More technical but very powerful

---

## 📝 For Now: Use Cyberduck

The **Synchronize feature in Cyberduck** is your best bet:
- ✅ Works with WordPress.com SFTP
- ✅ Visual confirmation of changes
- ✅ Can save sync configurations
- ✅ Relatively fast (1-click sync after setup)

---

## 🎨 Your Workflow Starting Today:

1. **Edit** `horizonheightswebsite.html` or files in `assets/` on your Desktop
2. **Open Cyberduck**
3. **Click your "Horizon Heights Sync" bookmark**
4. **Click "Continue"** to sync
5. **Refresh** your website → See changes live!

This takes about 10 seconds once you have the bookmark set up.

---

## Need Help?

If you want to explore more automated options or switch hosting providers for better automation, let me know!

# 🎯 How to Update Your Website - Complete Step-by-Step Guide

## Part 1: ONE-TIME SETUP (Do This First, Only Once!)

### Step 1: Open Cyberduck
1. Look at your **Dock** at the bottom of your screen
2. Find the **Cyberduck icon** (it looks like a yellow duck)
3. **Click it once** to open Cyberduck
4. If you don't see it in the Dock, press **Command + Space**, type "Cyberduck", and press **Enter**

### Step 2: Connect to Your WordPress Site
1. In Cyberduck, click the **"Open Connection"** button at the top left
2. In the window that pops up, make sure the **dropdown at the top** says "SFTP (SSH File Transfer Protocol)"
3. Fill in these fields:
   - **Server:** `sftp.wp.com`
   - **Port:** `22`
   - **Username:** `jkeith3725.wordpress.com`
   - **Password:** `1ztHc8O40IdZUD8FI3RG`
4. **Click the "Connect" button** at the bottom

⏱️ *Wait 3-5 seconds while it connects*

5. When asked "Do you want to save the password?", click **"Allow"** or **"Yes"**

### Step 3: Navigate to Your Theme Folder
1. You'll see a list of folders and files
2. **Double-click** the folder called `wp-content`
3. **Double-click** the folder called `themes`
4. **Double-click** the folder called `horizon-heights-theme`

✅ **You should now see files like:** `index.php`, `header.php`, `footer.php`, etc.

### Step 4: Set Up Your Sync Bookmark (THIS IS THE MAGIC PART!)
1. At the bottom of the Cyberduck window, find the **Action button** (it looks like a **gear** or **settings icon** ⚙️)
2. **Click the Action button**
3. From the menu that appears, click **"Synchronize..."**

4. A new window will pop up with options:
   - **Remote folder:** Should already say `horizon-heights-theme` ✅
   - **Local folder:** Click the **"Choose..."** button

5. When the file browser opens:
   - Click **"Desktop"** in the sidebar on the left
   - Find and click the folder called **"HorizonHeightsWebsite"**
   - Click the **"Choose"** button at the bottom right

6. Back in the Synchronize window, look for **"Direction"** or **"Action"**:
   - Make sure it's set to **"Upload"** (with an arrow pointing UP ⬆️)
   - If you see a checkbox that says **"Delete files"**, you can check it (this keeps WordPress clean)

7. **IMPORTANT:** At the bottom of this window, click the **Bookmark icon** (looks like a star ⭐ or bookmark 🔖)
8. Give it a name: **"Horizon Heights Sync"**
9. Click **"Save"** or **"Add"**

10. Click **"Continue"** to do the first sync

⏱️ *This first sync will take 1-2 minutes because it's uploading everything*

11. When it's done, you'll see "Transfer complete" or the window will close

✅ **ONE-TIME SETUP COMPLETE!** You never have to do this again.

---

## Part 2: YOUR DAILY WORKFLOW (Every Time You Make Changes)

### 🎨 When You Want to Change Your Website:

#### STEP 1: Make Your Changes on Your Desktop

1. On your Desktop, find the **"HorizonHeightsWebsite"** folder
2. **Double-click** to open it
3. Open the file you want to change:
   - To change **text/content**: Open `horizonheightswebsite.html`
   - To change **images**: Go into the `assets` → `images` folder and replace images
   - To change **colors/styling**: Go into `assets` → `css` and open `styles.css`

4. **Make your changes** (edit text, swap images, whatever you need)
5. **Save the file** (Command + S or File → Save)
6. **Close the file**

#### STEP 2: Sync to WordPress (Upload Your Changes)

1. **Open Cyberduck** (if it's not already open)
   - Click the duck icon in your Dock
   - OR press Command + Space, type "Cyberduck", press Enter

2. In Cyberduck's left sidebar, find your bookmark called **"Horizon Heights Sync"**
   - It should be under "Bookmarks" section

3. **Double-click** the "Horizon Heights Sync" bookmark

⏱️ *Cyberduck will connect (takes 2-3 seconds)*

4. A window will pop up showing what files have changed
   - You'll see a list of files with arrows (↑ means it will upload)

5. **Click the "Continue" button** at the bottom

⏱️ *Your files are now uploading - usually takes 5-30 seconds*

6. When done, you'll see "Transfer complete" or the window will close

✅ **YOUR CHANGES ARE NOW LIVE!**

#### STEP 3: Check Your Live Website

1. Open your web browser (Safari, Chrome, etc.)
2. Go to: `https://horizonheightsproductions.com`
3. **Press Command + Shift + R** (this hard refreshes to see new changes)
4. **Look at your changes!** They should be live now!

---

## 📋 QUICK REFERENCE CARD

**Every time you make a change:**

1. ✏️ Edit file in `/Desktop/HorizonHeightsWebsite/`
2. 💾 Save the file (Command + S)
3. 🦆 Open Cyberduck
4. 🔖 Double-click "Horizon Heights Sync" bookmark
5. ⬆️ Click "Continue" to upload
6. ✅ Check your website!

**Total time:** About 30 seconds after you save your file!

---

## 🎯 EXAMPLE: Changing a Gallery Image

Let's say you want to replace one of the gallery images:

1. On your Desktop, open **"HorizonHeightsWebsite"** folder
2. Open **"assets"** folder
3. Open **"images"** folder
4. Find the image you want to replace (like `gallery-1.jpg`)
5. **Drag your new image** into this folder
6. When asked, click **"Replace"**
7. **Open Cyberduck**
8. **Double-click** "Horizon Heights Sync" bookmark
9. Click **"Continue"**
10. Done! Your website now has the new image!

---

## ❓ TROUBLESHOOTING

**Q: What if I don't see the "Horizon Heights Sync" bookmark?**
A: Go back to Part 1, Step 4 and create the bookmark again.

**Q: What if Cyberduck says "Connection failed"?**
A: Click "Disconnect", then double-click the bookmark again.

**Q: What if my changes don't show on the website?**
A: Press Command + Shift + R in your browser to hard refresh (clears cache).

**Q: Can I break my website doing this?**
A: Not really! If something goes wrong, just message me and I'll help fix it.

---

## 💡 PRO TIPS

✅ **Always save your files** before syncing (Command + S)
✅ **Keep Cyberduck open** in the background - it stays connected
✅ **Name your images clearly** so you know what they are
✅ **Make a backup** of your HorizonHeightsWebsite folder occasionally (just copy the whole folder to another location)

---

## 🆘 NEED HELP?

If anything is confusing or doesn't work, just ask! I'm here to help.

**Remember:** Once the bookmark is set up (Part 1), your daily workflow is literally just:
1. Edit file
2. Save file  
3. Open Cyberduck
4. Double-click bookmark
5. Click Continue
6. Done!

You've got this! 🚀

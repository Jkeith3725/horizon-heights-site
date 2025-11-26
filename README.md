# Horizon Heights Productions Website

Welcome to the Horizon Heights Productions website project folder. This directory contains all the source code, assets, and documentation for the website.

## 📂 Folder Structure

- **`docs/`**: Contains all guides, SEO strategies, and reference documents.
  - [How to Sync Changes](docs/HOW_TO_SYNC.md)
  - [SEO Task Tracker](docs/Horizon_Heights_SEO_Task_Tracker.md)
  - [Image Alt Text Guide](docs/Horizon_Heights_Image_Alt_Text_Guide.md)
- **`scripts/`**: Helper scripts for maintaining the site.
  - `update_gallery.py`: Run this after adding new images to `assets/images/gallery/`.
  - `sync-to-wordpress.sh`: Script for syncing content (if applicable).
- **`assets/`**: Images, CSS, JS, and video files.
- **`archive/`**: Old backups and unused files.
- **`_project_resources/`**: Raw project files, info folders, and other resources not directly part of the live site code.

## 🚀 Quick Start: How to Update

### 1. Adding Gallery Images
1.  Add your images to `assets/images/gallery/[category]`.
2.  Run the update script:
    ```bash
    python3 scripts/update_gallery.py
    ```
3.  This automatically updates `assets/js/gallery-data.js`.

### 2. Updating Text/Content
- **Homepage:** Edit `index.html`
- **Services:** Edit `services.html`
- **Gallery Layout:** Edit `gallery.html`

### 3. Publishing Changes
1.  Open Terminal.
2.  Navigate to this folder:
    ```bash
    cd "/Users/justinkeith/Desktop/HorizonHeightsWebsite"
    ```
3.  Commit and push to GitHub (which triggers Netlify deployment):
    ```bash
    git add .
    git commit -m "Describe your changes here"
    git push
    ```

## 📚 Documentation
For detailed instructions, please refer to the files in the `docs/` folder.
- **[Simple Publish Guide](docs/SIMPLE_PUBLISH_GUIDE.md)**: The easiest way to put changes live.
- **[SEO Strategy](docs/Comprehensive%20SEO%20&%20AI%20Optimization%20Strategy.txt)**: Full SEO plan.

---
*Last Organized: November 2025*

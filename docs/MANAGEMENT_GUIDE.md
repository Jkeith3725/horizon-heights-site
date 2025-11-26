# How to Manage Your Website

You can now manage your entire website directly from this folder: `/Users/justinkeith/Desktop/HorizonHeightsWebsite/`

## 1. Making Edits
Simply open the files on your computer and edit them.

*   **To change text/content:** Edit `index.html`, `services.html`, or `gallery.html`.
*   **To add images:** Drag new images into the `assets/images/` folder.
*   **To change styles:** Edit `assets/css/styles.css`.

### Managing the Gallery
We have automated the gallery for you!
1.  Go to `assets/images/gallery/`.
2.  **Add photos:** Drag and drop your new `.jpg` or `.png` files here.
3.  **Remove photos:** Simply delete the files you don't want.
4.  **Run the Publisher:** When you run `publish_changes.sh`, the site will automatically update the gallery grid to match this folder.

## 2. Publishing Changes
Once you have saved your changes, you need to "push" them to the live site.

1.  Open the **Terminal** app.
2.  Type `cd ` (with a space) and drag this folder into the terminal window, then hit Enter.
3.  Run this command:
    ```bash
    ./publish_changes.sh
    ```
4.  Follow the prompts to describe your changes.
5.  **Done!** Netlify will detect the update and publish it automatically within seconds.

## File Structure
*   `index.html` - The **Home** page (Hero, Process, Testimonials).
*   `services.html` - The **Services** page (Offerings, Pricing, Social Media).
*   `gallery.html` - The **Gallery** page (Photos, FAQ).
*   `assets/` - Contains all your images, fonts, and styles.

## Need Help?
If the script doesn't run or you see an error, you can always do it manually in the Terminal:
1.  `git add .`
2.  `git commit -m "Description of change"`
3.  `git push`

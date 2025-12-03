# Deployment Instructions: Horizon Heights Service Gateway

Follow these steps to deploy your site to Netlify and connect your Namecheap domain (`horizonheightsproductionsmarietta.productions`).

## Step 1: Deploy to Netlify (Create NEW Site)

**CRITICAL:** You must create a **NEW** site. Do not link to any existing site.

1.  Go to [app.netlify.com](https://app.netlify.com) and log in.
2.  Go to the **"Sites"** tab.
3.  Scroll down to the bottom or look for the box that says **"Add new site"** > **"Deploy manually"**.
4.  Drag the entire folder `Horizon Heights Landing Page` from your desktop into the "Drag and drop your site output folder here" area.
5.  Netlify will upload and create a **brand new site** with a random URL (e.g., `jolly-panda-123456.netlify.app`).

## Step 2: Add Custom Domain
1.  In your Netlify site dashboard, click **"Domain management"** (or "Site configuration" > "Domain management").
2.  Click **"Add a domain"**.
3.  Enter `horizonheightsproductionsmarietta.productions`.
4.  Click **"Verify"** and then **"Add domain"**.

## Step 3: Configure Namecheap DNS
You need to point your domain from Namecheap to Netlify.

1.  Log in to your [Namecheap Account](https://www.namecheap.com).
2.  Go to **Domain List** and click **Manage** next to `horizonheightsproductionsmarietta.productions`.
3.  Go to the **Advanced DNS** tab.
4.  **Delete** any existing records that might conflict (like parking pages).
5.  Add the following two records (Netlify will also show you these in the "Check DNS configuration" panel):

    | Type | Host | Value | TTL |
    | :--- | :--- | :--- | :--- |
    | **A Record** | `@` | `75.2.60.5` | Automatic |
    | **CNAME Record** | `www` | `[your-site-name].netlify.app` | Automatic |

    *(Note: Replace `[your-site-name].netlify.app` with the actual Netlify URL you got in Step 1).*

6.  Save changes. DNS propagation can take up to 24-48 hours, but often happens within minutes.

## Step 4: Verify Forms & SSL
1.  **SSL**: Netlify automatically provisions a free SSL certificate (HTTPS). This might take a few minutes after DNS propagates.
2.  **Forms**: Once deployed, fill out one of your forms on the live site.
3.  Go to your Netlify Site Dashboard > **Forms**. You should see the submission there.
4.  You can configure email notifications in **Site configuration > Forms > Form notifications**.

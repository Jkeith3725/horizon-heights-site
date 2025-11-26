# DNS Update Guide - Point Your Domain to Netlify

## Step-by-Step Instructions

### Step 1: Access Domain Settings
1. In WordPress.com, click **My Sites** (top left)
2. Click **Upgrades** in the left sidebar
3. Click **Domains**
4. Click on **horizonheightsproductions.com**

### Step 2: Find DNS Settings
1. Look for a tab or section called **DNS Records** or **Name Servers**
2. You may need to click **Advanced** or **DNS Settings**

### Step 3: Add DNS Records

You need to add TWO records:

#### Record 1: A Record
```
Type: A
Name: @ (or leave blank)
Points to: 75.2.60.5
TTL: 3600 (or Auto)
```

#### Record 2: CNAME Record
```
Type: CNAME
Name: www
Points to: cosmic-dango-297d1e.netlify.app
TTL: 3600 (or Auto)
```

### Step 4: Save Changes
1. Click **Save** or **Add Record** for each entry
2. Wait 5-10 minutes for DNS propagation

### Step 5: Verify in Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site: **cosmic-dango-297d1e**
3. Go to **Domain Settings**
4. Click **Add custom domain**
5. Enter: `horizonheightsproductions.com`
6. Click **Verify**

## What If You Can't Find DNS Settings?

If WordPress.com doesn't show DNS settings, you may need to:
1. **Upgrade your plan** (DNS access requires Business plan or higher)
2. **Contact WordPress.com support** to enable DNS management
3. **Transfer domain** to a registrar like Namecheap or GoDaddy

## Need Help?

If you get stuck, take a screenshot of what you see and I can guide you through the specific options available to you.

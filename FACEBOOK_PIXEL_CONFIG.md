# Quick Setup: Facebook Pixel Configuration

## ✅ Already Configured!

The Facebook Pixel ID is **already set up to be configurable** via environment variables. Here's how to use it:

## 📝 Configuration Steps

### 1. Add Your Pixel ID to `.env.local`

Open your `.env.local` file and add:

```env
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```

Replace `123456789012345` with your actual Facebook Pixel ID.

### 2. For Production (`.env.production`)

```env
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```

### 3. Environment Variable Details

**Variable Name:** `NEXT_PUBLIC_FB_PIXEL_ID`

**Why `NEXT_PUBLIC_`?**

- The `NEXT_PUBLIC_` prefix makes the variable accessible in the browser
- Required because Facebook Pixel runs client-side
- Next.js automatically exposes these variables to the frontend

**Where It's Used:**

- `/src/lib/facebook-pixel.ts` (line 9)
- Automatically loaded when the app starts

## 🔍 How It Works

### Code Implementation

```typescript
// In /src/lib/facebook-pixel.ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export const initFacebookPixel = () => {
  if (!FB_PIXEL_ID) {
    console.warn("Facebook Pixel ID not configured");
    return;
  }

  // Initialize pixel with your ID
  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
};
```

### Safety Features

✅ **Graceful Fallback:** If no Pixel ID is provided, tracking is disabled
✅ **Console Warning:** You'll see a warning if the ID is missing
✅ **No Errors:** App works fine without Pixel ID (tracking just won't happen)

## 🧪 Testing Your Configuration

### 1. Check if Pixel ID is Loaded

Open browser console and type:

```javascript
console.log(process.env.NEXT_PUBLIC_FB_PIXEL_ID);
```

You should see your Pixel ID.

### 2. Verify Pixel is Initialized

Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) and:

1. Visit your website
2. Click the extension icon
3. You should see your Pixel ID and events

### 3. Check Console for Warnings

If you see:

```
Facebook Pixel ID not configured
```

Then the environment variable is not set correctly.

## 📋 Complete Example

### Your `.env.local` File Should Look Like:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Product Configuration
PRODUCT_PRICE=49900
PRODUCT_CURRENCY=INR

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/rasoigadget?schema=public"

# Admin Configuration
ADMIN_SECRET_KEY=your_secure_admin_secret_key_here

# Facebook Pixel (Analytics)
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```

## 🚀 Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_FB_PIXEL_ID` = `your_pixel_id`
4. Redeploy your app

### Netlify

1. Go to Site Settings → Build & Deploy → Environment
2. Add: `NEXT_PUBLIC_FB_PIXEL_ID` = `your_pixel_id`
3. Redeploy

### Other Platforms

Add `NEXT_PUBLIC_FB_PIXEL_ID` as an environment variable in your hosting platform's settings.

## 🔒 Security Note

**Facebook Pixel ID is PUBLIC** - It's meant to be exposed in the browser, so it's safe to use `NEXT_PUBLIC_` prefix. This is different from secret keys which should never be exposed.

## ✅ Verification Checklist

- [ ] Added `NEXT_PUBLIC_FB_PIXEL_ID` to `.env.local`
- [ ] Restarted development server (`npm run dev`)
- [ ] Checked browser console (no warnings)
- [ ] Installed Facebook Pixel Helper
- [ ] Verified pixel is firing on your site
- [ ] Tested events (ViewContent, InitiateCheckout, etc.)

## 🆘 Troubleshooting

### Pixel Not Working?

1. **Check Environment Variable:**

   ```bash
   # In terminal
   echo $NEXT_PUBLIC_FB_PIXEL_ID
   ```

2. **Restart Dev Server:**

   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

3. **Clear Browser Cache:**

   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

4. **Check Console:**
   - Open DevTools → Console
   - Look for "Facebook Pixel ID not configured" warning

### Still Not Working?

1. Verify Pixel ID is correct (15-16 digits)
2. Check no typos in variable name
3. Ensure `.env.local` is in project root
4. Try adding the ID directly in code temporarily to test:

```typescript
// Temporary test in /src/lib/facebook-pixel.ts
export const FB_PIXEL_ID = "123456789012345"; // Your actual ID
```

If it works, the issue is with environment variable loading.

## 📚 Related Documentation

- **Main Guide:** `/FACEBOOK_PIXEL_GUIDE.md`
- **Summary:** `/FACEBOOK_PIXEL_SUMMARY.md`
- **Next.js Env Docs:** [nextjs.org/docs/basic-features/environment-variables](https://nextjs.org/docs/basic-features/environment-variables)

## ✨ Summary

Your Facebook Pixel is **already fully configurable** via environment variables:

✅ Variable: `NEXT_PUBLIC_FB_PIXEL_ID`
✅ Location: `.env.local` (development) or `.env.production` (production)
✅ Graceful fallback if not configured
✅ Works across all environments
✅ Easy to change without code modifications

Just add your Pixel ID to `.env.local` and restart your dev server!

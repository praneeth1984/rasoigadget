# Facebook Pixel Integration Guide

## Overview

Facebook Pixel is now fully integrated into your Rasoi Gadget ebook store to track the complete customer journey from landing page to purchase completion. This enables you to:

- Track conversion funnel
- Optimize Facebook Ads
- Create custom audiences
- Measure ROI
- Retarget visitors

## Events Tracked

### Standard Facebook Events

1. **PageView** - Automatically tracked on every page
2. **ViewContent** - When user lands on the product page
3. **InitiateCheckout** - When user clicks "Buy Now"
4. **AddPaymentInfo** - When Razorpay payment gateway opens
5. **Purchase** - When payment is successfully completed

### Custom Events

- **ViewSection** - When user scrolls to specific sections
- **ViewFAQ** - When user views FAQ section
- **ViewTestimonials** - When user views testimonials
- **ViewOrders** - When user checks their order history
- **Download** - When user downloads ebooks

## Setup Instructions

### Step 1: Create Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Click "Connect Data Sources" → "Web"
3. Select "Facebook Pixel" → "Connect"
4. Name your pixel (e.g., "Rasoi Gadget Pixel")
5. Enter your website URL
6. Click "Continue"

### Step 2: Get Your Pixel ID

1. In Events Manager, click on your pixel name
2. Click "Settings" in the left sidebar
3. Copy your **Pixel ID** (it's a 15-16 digit number)

### Step 3: Add Pixel ID to Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id_here
```

For production (`.env.production`):

```env
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id_here
```

### Step 4: Verify Installation

1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) Chrome extension
2. Visit your website
3. Click the extension icon
4. You should see your pixel firing with PageView event

## Event Tracking Details

### 1. ViewContent Event

**Triggers:** When user lands on the main page

**Data Sent:**

```javascript
{
  content_name: 'Satvik 3-Book Collection Landing Page',
  content_type: 'product',
  value: 499,
  currency: 'INR'
}
```

### 2. InitiateCheckout Event

**Triggers:** When user clicks any "Buy Now" button

**Data Sent:**

```javascript
{
  content_name: 'Satvik 3-Book Collection',
  content_type: 'product',
  value: 499,
  currency: 'INR',
  num_items: 1
}
```

### 3. AddPaymentInfo Event

**Triggers:** When Razorpay payment gateway opens

**Data Sent:**

```javascript
{
  content_name: 'Satvik 3-Book Collection',
  content_type: 'product',
  value: 499,
  currency: 'INR'
}
```

### 4. Purchase Event

**Triggers:** When payment is successfully verified

**Data Sent:**

```javascript
{
  content_name: 'Satvik 3-Book Collection',
  content_type: 'product',
  content_ids: ['order_id'],
  value: 499,
  currency: 'INR',
  transaction_id: 'payment_id',
  num_items: 1
}
```

## Conversion Funnel

```
Landing Page (ViewContent)
    ↓
Click Buy Button (InitiateCheckout)
    ↓
Payment Gateway Opens (AddPaymentInfo)
    ↓
Payment Success (Purchase)
```

## Testing Your Pixel

### Using Facebook Pixel Helper

1. Install the Chrome extension
2. Navigate through your site
3. Check that events fire correctly:
   - PageView on every page
   - ViewContent on landing page
   - InitiateCheckout when clicking Buy
   - AddPaymentInfo when Razorpay opens
   - Purchase after successful payment

### Using Events Manager Test Events

1. Go to Events Manager → Test Events
2. Enter your website URL
3. Click "Open Website"
4. Perform actions on your site
5. See events appear in real-time

### Test Purchase Flow

1. Use Razorpay test mode
2. Click "Buy Now"
3. Complete test purchase
4. Check Events Manager for Purchase event

**Test Card Details:**

- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## Facebook Ads Optimization

### Creating Custom Audiences

1. **Website Visitors:**

   - People who visited in last 30 days
   - People who viewed content but didn't purchase

2. **Engaged Users:**

   - People who initiated checkout
   - People who added payment info

3. **Purchasers:**
   - People who completed purchase
   - Exclude from acquisition campaigns

### Creating Lookalike Audiences

1. Go to Audiences → Create Audience → Lookalike Audience
2. Source: Purchasers (from pixel data)
3. Location: India (or your target market)
4. Audience size: 1-3% for best results

### Campaign Optimization

1. **Conversion Campaigns:**

   - Optimize for Purchase event
   - Use Purchase value for ROAS optimization

2. **Retargeting Campaigns:**

   - Target InitiateCheckout but not Purchase
   - Offer special discount or bonus

3. **Awareness Campaigns:**
   - Target ViewContent event
   - Build top-of-funnel audience

## Tracking Custom Events

You can add custom tracking for specific user actions:

```typescript
import { trackCustomEvent } from "@/lib/facebook-pixel";

// Track when user scrolls to a section
trackCustomEvent("ViewSection", {
  section_name: "Testimonials",
});

// Track when user downloads
trackCustomEvent("Download", {
  file_name: "satvik-foundations.pdf",
  content_type: "ebook",
});
```

## Privacy & Compliance

### GDPR Compliance

If you have European visitors, add a cookie consent banner:

```typescript
// Only initialize pixel after consent
if (userConsent) {
  initFacebookPixel();
}
```

### Data Processing

Facebook Pixel automatically hashes personal data (email, phone) before sending to Facebook servers.

### Privacy Policy

Update your privacy policy to mention:

- Use of Facebook Pixel
- Data collected (browsing behavior, purchases)
- Purpose (advertising, analytics)
- User rights (opt-out options)

## Troubleshooting

### Pixel Not Firing

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_FB_PIXEL_ID` is set
3. Check Facebook Pixel Helper extension
4. Ensure ad blockers are disabled for testing

### Events Not Showing in Events Manager

1. Wait 20-30 minutes for data to appear
2. Check Test Events for real-time data
3. Verify pixel ID is correct
4. Check browser console for errors

### Purchase Event Not Firing

1. Test with Razorpay test mode
2. Check payment verification is successful
3. Look for console errors
4. Verify `trackPurchase` is called after verification

## Advanced Features

### Server-Side Events (Optional)

For more accurate tracking, implement Facebook Conversions API:

1. Send Purchase events from your server
2. More reliable than browser-only tracking
3. Works even with ad blockers
4. Requires Facebook Conversions API setup

### Dynamic Ads

Use pixel data to create dynamic product ads:

1. Set up product catalog
2. Use ViewContent and Purchase events
3. Show personalized ads to visitors

### Attribution Windows

Configure attribution windows in Events Manager:

- 1-day click, 7-day view (default)
- Customize based on your sales cycle

## Monitoring & Reporting

### Key Metrics to Track

1. **Conversion Rate:**

   - InitiateCheckout → Purchase
   - Typical: 2-5%

2. **Cost Per Purchase:**

   - Ad Spend / Purchases
   - Track in Ads Manager

3. **ROAS (Return on Ad Spend):**

   - Revenue / Ad Spend
   - Target: 3x or higher

4. **Funnel Drop-off:**
   - Where users abandon
   - Optimize those stages

### Reports to Create

1. **Funnel Analysis:**

   - ViewContent → InitiateCheckout → Purchase
   - Identify drop-off points

2. **Time to Purchase:**

   - How long from first visit to purchase
   - Optimize retargeting timing

3. **Device Performance:**
   - Mobile vs Desktop conversion rates
   - Optimize for best-performing devices

## Best Practices

1. **Test Regularly:**

   - Check pixel firing after code changes
   - Verify events in Test Events

2. **Use Standard Events:**

   - Stick to Facebook's standard events
   - Better for optimization

3. **Include Value:**

   - Always send purchase value
   - Enables ROAS optimization

4. **Track Micro-Conversions:**

   - Not just purchases
   - InitiateCheckout, AddPaymentInfo

5. **Create Audiences:**
   - Build audiences from pixel data
   - Use for retargeting

## Support Resources

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
- [Events Manager](https://business.facebook.com/events_manager)
- [Pixel Helper Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/)
- [Facebook Business Help Center](https://www.facebook.com/business/help)

## Summary

Your Facebook Pixel is now tracking the complete customer journey:

✅ Page views across all pages
✅ Product page views with value
✅ Checkout initiations
✅ Payment gateway interactions
✅ Successful purchases with transaction details

This data enables you to:

- Optimize Facebook Ads campaigns
- Create custom and lookalike audiences
- Track ROI and ROAS
- Retarget potential customers
- Measure marketing effectiveness

Start running Facebook Ads and use this pixel data to optimize your campaigns for maximum ROI!

# Razorpay Payment Integration Setup Guide

This guide will help you set up Razorpay payment gateway for the Satvik Cookbook ebook landing page.

## Prerequisites

- A Razorpay account (sign up at https://razorpay.com)
- Razorpay API credentials (Key ID and Key Secret)

## Step 1: Get Razorpay Credentials

1. Log in to your Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Copy the **Key ID** and **Key Secret**

## Step 2: Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace the placeholder values with your actual Razorpay credentials:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET

# Next.js Public Variables (exposed to browser)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID

# Product Configuration
PRODUCT_PRICE=4700
PRODUCT_CURRENCY=INR
```

**Important Notes:**
- Use `rzp_test_` prefix for test mode
- Use `rzp_live_` prefix for production mode
- Never commit `.env.local` to version control
- The `PRODUCT_PRICE` is in rupees (4700 = ₹47)

## Step 3: Test the Integration

### In Test Mode

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Click any "Buy Now" button on the page

3. Use Razorpay test card details:
   - **Card Number:** 4111 1111 1111 1111
   - **CVV:** Any 3 digits
   - **Expiry:** Any future date
   - **Name:** Any name

4. Complete the test payment

5. You should be redirected to the success page with download links

### Test UPI Payment

- **UPI ID:** success@razorpay
- This will simulate a successful payment

### Test Payment Failure

- **Card Number:** 4111 1111 1111 1112
- This will simulate a failed payment

## Step 4: Switch to Live Mode

When ready for production:

1. Generate Live API keys from Razorpay Dashboard
2. Update `.env.local` with live credentials:
   ```env
   RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   ```

3. Rebuild and deploy your application

## Payment Flow

1. **User clicks "Buy Now"** → Triggers `useRazorpay` hook
2. **Create Order** → API call to `/api/payment/create-order`
3. **Open Razorpay Checkout** → User enters payment details
4. **Payment Success** → Razorpay returns payment details
5. **Verify Payment** → API call to `/api/payment/verify`
6. **Redirect to Success** → User lands on `/success` page with download links

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── create-order/
│   │       │   └── route.ts          # Creates Razorpay order
│   │       └── verify/
│   │           └── route.ts          # Verifies payment signature
│   └── success/
│       └── page.tsx                  # Success page with downloads
├── components/
│   └── BuyButton.tsx                 # Payment trigger button
├── hooks/
│   └── useRazorpay.ts               # Payment hook
└── lib/
    └── razorpay.ts                  # Razorpay utilities
```

## Troubleshooting

### Payment Modal Not Opening

- Check if Razorpay script is loading (check browser console)
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set correctly
- Make sure you're using the correct key format (`rzp_test_` or `rzp_live_`)

### Payment Verification Failed

- Check if `RAZORPAY_KEY_SECRET` is correct
- Verify the signature calculation in `/api/payment/verify`
- Check server logs for errors

### Order Creation Failed

- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set
- Check Razorpay Dashboard for API errors
- Ensure amount is a positive integer

## Security Best Practices

1. **Never expose Key Secret** to the client
2. **Always verify payments** on the server side
3. **Use HTTPS** in production
4. **Implement rate limiting** on API routes
5. **Log all transactions** for audit trails
6. **Validate amounts** on the server before creating orders

## Adding Download Links

Currently, download links in `/success` page point to:
```
/downloads/satvik-foundations.pdf
/downloads/satvik-celebrations.pdf
/downloads/satvik-wellness.pdf
```

To serve actual PDFs:

1. Create a `public/downloads/` directory
2. Add your PDF files there
3. They'll be accessible at `/downloads/filename.pdf`

Alternatively, use a cloud storage service (AWS S3, Google Cloud Storage) and update the links in `src/app/success/page.tsx`.

## Support

For Razorpay specific issues:
- Documentation: https://razorpay.com/docs/
- Support: https://razorpay.com/support/

For integration issues with this project:
- Check the API route logs in your terminal
- Verify environment variables are loaded correctly
- Test with Razorpay test credentials first

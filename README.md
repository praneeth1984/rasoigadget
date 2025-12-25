# Rasoi Gadget - Satvik Cookbook Ebook Landing Page

A professional, conversion-optimized Next.js landing page for selling "The Satvik 3-Book Collection: Where Health Meets Celebration" ebook.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Razorpay (Required for Payments)

1. Sign up at [Razorpay](https://razorpay.com) and get your API credentials
2. Copy `.env.example` to `.env.local`
3. Add your Razorpay credentials to `.env.local`:

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

**📖 See [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) for detailed setup instructions**

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Color Scheme

- **Primary (Satvik Green)**: Deep earthy green (#2D5016) - represents health & trust
- **Secondary (Warm Off-White)**: Clean background (#FAF8F3)
- **Accent (Saffron Orange)**: CTA buttons (#FF9933)
- **Text (Charcoal Black)**: Easy reading (#2C2C2C)
- **Support (Soft Sage Green)**: Sections & highlights (#C8D5B9)

## ✨ Key Features

### Payment Integration

- **Razorpay Gateway**: Secure payment processing with Razorpay
- **Multiple Payment Methods**: Cards, UPI, Net Banking, Wallets
- **Payment Verification**: Server-side signature verification for security
- **Success Page**: Automatic redirect with download links after payment
- **Test Mode**: Easy testing with Razorpay test credentials

### Order Management & Tracking

- **Database Integration**: PostgreSQL with Prisma ORM for order storage
- **User Order History**: Customers can view all their past orders by email
- **Download Access**: Lifetime access to download purchased ebooks
- **Order Details**: Complete payment information, dates, and transaction IDs
- **Admin Dashboard**: Secure admin panel to view all orders and statistics
- **Revenue Analytics**: Track total revenue, orders, and unique customers
- **CSV Export**: Export order data for accounting and analysis
- **Search & Filter**: Find orders by customer email, name, or transaction IDs

### Facebook Pixel Analytics

- **Conversion Tracking**: Full funnel tracking from landing to purchase
- **Standard Events**: PageView, ViewContent, InitiateCheckout, AddPaymentInfo, Purchase
- **Custom Events**: Section views, downloads, order tracking
- **Facebook Ads Optimization**: Data for campaign optimization and ROAS tracking
- **Custom Audiences**: Create retargeting audiences from pixel data
- **Lookalike Audiences**: Find similar customers for acquisition campaigns

### Professional Sales Page Sections

1. **Hero Section** - Compelling value proposition with clear CTA and trust signals
2. **Social Proof Bar** - Featured in publications and expert endorsements
3. **Problem-Solution Framework** - Addresses pain points and presents the solution
4. **Detailed Book Breakdown** - Comprehensive overview of all 3 books with features
5. **Testimonials** - Real customer reviews with ratings
6. **Bonus Offers** - Additional value proposition with limited-time bonuses
7. **FAQ Section** - Addresses common objections and questions
8. **Money-Back Guarantee** - Risk reversal to increase conversions
9. **Multiple CTAs** - Strategic placement throughout the page
10. **Professional Footer** - Links, support, and legal information

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-based configuration)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payment Gateway**: Razorpay
- **Package Manager**: npm

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── orders/         # Admin orders API
│   │   ├── orders/             # User orders API
│   │   └── payment/
│   │       ├── create-order/   # Razorpay order creation
│   │       └── verify/         # Payment verification & order storage
│   ├── admin/
│   │   └── page.tsx           # Admin dashboard
│   ├── orders/
│   │   └── page.tsx           # User orders page
│   ├── success/
│   │   └── page.tsx           # Post-payment success page
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Main landing page
│   └── globals.css            # Tailwind v4 config + global styles
├── components/
│   ├── Button.tsx             # Reusable button component
│   ├── BuyButton.tsx          # Payment trigger button
│   ├── Header.tsx             # Sticky header with navigation
│   ├── Section.tsx            # Section wrapper component
│   └── SectionTitle.tsx       # Section title component
├── hooks/
│   └── useRazorpay.ts         # Payment processing hook
└── lib/
    ├── prisma.ts              # Prisma client singleton
    └── razorpay.ts            # Razorpay utilities

prisma/
├── schema.prisma              # Database schema
└── migrations/                # Database migrations
```

## Landing Page Sections

The landing page is designed following proven ebook sales page best practices:

1. **Hero with Value Proposition** - Clear headline, benefits, pricing, and CTA
2. **Trust Indicators** - Security badges, guarantees, and social proof
3. **Featured In Bar** - Brand recognition and credibility
4. **Problem-Solution** - Empathizes with pain points before presenting solution
5. **What's Inside** - Detailed breakdown of each book's content
6. **Testimonials** - Social proof from satisfied customers
7. **Bonuses** - Additional value with urgency and scarcity
8. **FAQ** - Overcomes objections preemptively
9. **Guarantee** - 30-day money-back guarantee for risk reversal
10. **Final CTA** - Summary of offer with clear next steps

## 🎨 Dark Theme

The entire landing page features a modern dark theme:

- Deep dark backgrounds with elevated surfaces
- Vibrant Satvik Green (#6EAF3E) that pops on dark
- Custom scrollbar with green accent
- Smooth hover effects and transitions
- Professional frosted glass effects

## 🔧 Customization

### Update Product Details

1. Edit book information in `src/app/page.tsx`
2. Update testimonials with real customer reviews
3. Adjust pricing in `src/hooks/useRazorpay.ts` (line: `initiatePayment(47)`)
4. Modify FAQ content based on your product

### Add Download Files

1. Create `public/downloads/` directory
2. Add your PDF files:
   - `satvik-foundations.pdf`
   - `satvik-celebrations.pdf`
   - `satvik-wellness.pdf`
3. They'll be accessible at `/downloads/filename.pdf`

### Change Colors

Modify the theme in `src/app/globals.css`:

```css
@theme {
  --color-satvik-green: #6eaf3e;
  --color-saffron-orange: #ff9933;
  /* ... other colors */
}
```

## 🧪 Testing Payments

### Test Mode (Development)

Use Razorpay test credentials and test cards:

**Test Card:**

- Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Test UPI:**

- UPI ID: `success@razorpay`

See [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) for more test scenarios.

## 💾 Database Setup

This application uses PostgreSQL to store orders and user information. Follow these steps:

1. **Install PostgreSQL** (if not already installed)
2. **Create a database** named `rasoigadget`
3. **Configure environment variables** in `.env.local`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/rasoigadget?schema=public"
   ADMIN_SECRET_KEY=your_secure_admin_key_here
   ```
4. **Run Prisma migrations**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

**📖 See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed setup instructions**

### Access Points

- **User Orders**: Visit `/orders` to view order history by email
- **Admin Dashboard**: Visit `/admin` and login with your `ADMIN_SECRET_KEY`

## 🚀 Deployment

1. Set up environment variables in your hosting platform
2. Set up a PostgreSQL database (e.g., Neon, Supabase, Railway)
3. Use **Live** Razorpay credentials for production
4. Run database migrations: `npx prisma migrate deploy`
5. Build the project: `npm run build`
6. Deploy to Vercel, Netlify, or any Node.js hosting

### Environment Variables for Production

```env
# Razorpay
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY

# Product
PRODUCT_PRICE=4700
PRODUCT_CURRENCY=INR

# Database
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Admin
ADMIN_SECRET_KEY=your_very_secure_random_key

# Facebook Pixel (Analytics)
NEXT_PUBLIC_FB_PIXEL_ID=your_facebook_pixel_id
```

## 📄 Documentation

- [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) - Complete Razorpay integration guide
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - PostgreSQL and Prisma setup guide
- [FACEBOOK_PIXEL_GUIDE.md](FACEBOOK_PIXEL_GUIDE.md) - Facebook Pixel tracking and analytics setup
- [CLAUDE.md](CLAUDE.md) - Guide for Claude Code when working with this repo

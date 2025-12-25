// Facebook Pixel tracking utilities

declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (!FB_PIXEL_ID) {
    console.warn('Facebook Pixel ID not configured');
    return;
  }

  // Facebook Pixel Code
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Track page view
export const trackPageView = () => {
  if (!window.fbq) return;
  window.fbq('track', 'PageView');
};

// Track when user views content (landing page)
export const trackViewContent = (contentName: string, value?: number) => {
  if (!window.fbq) return;
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
    content_type: 'product',
    value: value || 0,
    currency: 'INR',
  });
};

// Track when user clicks "Buy Now" button
export const trackInitiateCheckout = (value: number, currency: string = 'INR') => {
  if (!window.fbq) return;
  window.fbq('track', 'InitiateCheckout', {
    content_name: 'Satvik 3-Book Collection',
    content_type: 'product',
    value: value,
    currency: currency,
    num_items: 1,
  });
};

// Track when payment is added (Razorpay opens)
export const trackAddPaymentInfo = (value: number, currency: string = 'INR') => {
  if (!window.fbq) return;
  window.fbq('track', 'AddPaymentInfo', {
    content_name: 'Satvik 3-Book Collection',
    content_type: 'product',
    value: value,
    currency: currency,
  });
};

// Track successful purchase
export const trackPurchase = (
  value: number,
  orderId: string,
  paymentId: string,
  currency: string = 'INR'
) => {
  if (!window.fbq) return;
  window.fbq('track', 'Purchase', {
    content_name: 'Satvik 3-Book Collection',
    content_type: 'product',
    content_ids: [orderId],
    value: value,
    currency: currency,
    transaction_id: paymentId,
    num_items: 1,
  });
};

// Track custom events
export const trackCustomEvent = (eventName: string, params?: any) => {
  if (!window.fbq) return;
  window.fbq('trackCustom', eventName, params);
};

// Track when user views FAQ section
export const trackViewFAQ = () => {
  if (!window.fbq) return;
  trackCustomEvent('ViewFAQ', {
    content_name: 'FAQ Section',
  });
};

// Track when user views testimonials
export const trackViewTestimonials = () => {
  if (!window.fbq) return;
  trackCustomEvent('ViewTestimonials', {
    content_name: 'Testimonials Section',
  });
};

// Track when user scrolls to specific sections
export const trackSectionView = (sectionName: string) => {
  if (!window.fbq) return;
  trackCustomEvent('ViewSection', {
    section_name: sectionName,
  });
};

// Track when user clicks download button
export const trackDownload = (fileName: string) => {
  if (!window.fbq) return;
  trackCustomEvent('Download', {
    file_name: fileName,
    content_type: 'ebook',
  });
};

// Track when user views their orders
export const trackViewOrders = (orderCount: number) => {
  if (!window.fbq) return;
  trackCustomEvent('ViewOrders', {
    order_count: orderCount,
  });
};

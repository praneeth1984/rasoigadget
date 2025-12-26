'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Section from '@/components/Section';

interface Book {
  title: string;
  filename: string;
  isBonus?: boolean;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/orders?razorpay_order_id=${orderId}`);
        const data = await response.json();
        if (data.success) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  const purchasedProductName = order?.productName || (typeof window !== 'undefined' ? localStorage.getItem('lastPurchasedProduct') : '');
  const isSevenHabits = purchasedProductName?.includes('7 Habits');

  const books: Book[] = isSevenHabits 
    ? [
        { title: '7 Habits to Reset Your Life', filename: '7-habits-reset-life.pdf' },
        { title: '30-Day Habit Tracker', filename: 'habit-tracker.pdf', isBonus: true },
      ]
    : [
        { title: 'Satvik 4-in-1 Meal Book', filename: 'Satvik_4_in1_Meal_BookFinal.pdf' },
        { title: 'Satvik Protein Book', filename: 'Satvik_Protein_BookFinal.pdf' },
        { title: 'Satvik Dessert Book', filename: 'Satvik_Dessert_Book_Final.pdf' },
        { title: 'Kids Meal Planner', filename: 'Kids-Meal-Planner.pdf', isBonus: true },
        { title: 'Monthly Meal Planner', filename: 'Monthly-Meal-Planner.pdf', isBonus: true },
      ];

  const productTitle = isSevenHabits ? '7 Habits Guide' : 'Satvik 3-Book Collection';
  const themeColor = isSevenHabits ? 'text-[#00A3FF]' : 'text-satvik-green';
  const bgColor = isSevenHabits ? 'bg-[#00A3FF]' : 'bg-satvik-green';
  const borderColor = isSevenHabits ? 'border-[#00A3FF]/30' : 'border-satvik-green/30';
  const accentColor = isSevenHabits ? '#00A3FF' : '#9FCC7C';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-satvik-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Section background="dark">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`bg-dark-elevated rounded-2xl p-8 md:p-12 shadow-xl border-2 ${isSevenHabits ? 'border-[#00A3FF]' : 'border-satvik-green'}`}>
          {/* Success Icon */}
          <div className={`w-24 h-24 mx-auto mb-6 ${bgColor} rounded-full flex items-center justify-center`}>
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold ${themeColor} mb-4`}>
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-text-secondary mb-8 font-medium">
            Thank you for your purchase! Your <span className={themeColor}>{productTitle}</span> is ready to download.
          </p>

          {/* Payment Details */}
          {paymentId && (
            <div className="bg-dark-surface rounded-lg p-6 mb-8 text-left border border-white/5">
              <h3 className="text-sm font-semibold text-text-muted uppercase mb-3">Order Confirmation</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Payment ID:</span>
                  <span className="text-text-primary font-mono text-xs">{paymentId}</span>
                </div>
                {orderId && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Order ID:</span>
                    <span className="text-text-primary font-mono text-xs">{orderId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">Product:</span>
                  <span className={`text-text-primary font-bold ${themeColor}`}>{purchasedProductName || productTitle}</span>
                </div>
              </div>
            </div>
          )}

          {/* Download Section */}
          <div className={`bg-gradient-to-br ${isSevenHabits ? 'from-[#00A3FF]/10 to-[#00A3FF]/5' : 'from-satvik-green/20 to-saffron-orange/20'} rounded-2xl p-6 md:p-10 mb-8 border ${borderColor}`}>
            <h2 className={`text-3xl font-black ${themeColor} mb-4 uppercase tracking-tight`}>
              Download Now
            </h2>
            <p className="text-slate-400 mb-8 font-medium">
              Click the cards below to save your files. We recommend downloading them immediately.
            </p>

            <div className={`grid grid-cols-1 ${books.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} gap-6 mb-10`}>
              {books.map((book, index) => (
                <a
                  key={index}
                  href={`/downloads/${book.filename}`}
                  download
                  className={`bg-white/5 hover:bg-white/10 border-2 rounded-2xl p-6 transition-all group text-left ${book.isBonus ? 'border-saffron-orange/20 hover:border-saffron-orange' : `${borderColor} hover:${isSevenHabits ? 'border-[#00A3FF]' : 'border-satvik-green'}`}`}
                >
                  <div className="flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${book.isBonus ? 'bg-saffron-orange/20 text-saffron-orange' : `${isSevenHabits ? 'bg-[#00A3FF]/20 text-[#00A3FF]' : 'bg-satvik-green/20 text-satvik-green'}`}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 block ${book.isBonus ? 'text-saffron-orange' : themeColor}`}>
                        {book.isBonus ? 'Bonus Access' : 'Main Product'}
                      </span>
                      <p className="text-white font-bold text-lg leading-tight group-hover:text-white transition-colors">{book.title}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className={`p-4 ${isSevenHabits ? 'bg-[#00A3FF]/5' : 'bg-dark-bg/50'} rounded-xl border ${borderColor}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${isSevenHabits ? 'bg-[#00A3FF]/10' : 'bg-satvik-green/10'} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-5 h-5 ${themeColor}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-slate-400 text-xs font-medium text-left">
                  Files are in high-quality PDF format. We recommend saving them to your device for lifetime offline access.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 text-slate-400 text-sm font-medium">
            <p className="flex items-center justify-center gap-2">
              <span className="text-xl">📧</span> A copy of these links has also been sent to <span className="text-white font-bold">{order?.customerEmail || 'your email'}</span>.
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-xl">💾</span> You have <span className={`${themeColor} font-black`}>LIFETIME ACCESS</span> to all future updates of this product.
            </p>
          </div>

          {/* Back to Home */}
          <div className={`mt-12 pt-8 border-t ${isSevenHabits ? 'border-white/5' : 'border-satvik-green/20'}`}>
            <a href="/">
              <Button size="large" variant="secondary" className="!rounded-2xl px-12">
                Explore More Guides
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-royal-purple to-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary group-hover:text-gold transition-colors">
                Rasoi Gadget
              </h1>
              <p className="text-[10px] text-text-muted">Satvik Cooking Books</p>
            </div>
          </a>
          <a 
            href="/" 
            className="text-sm text-text-secondary hover:text-gold transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </header>

      <div className="pt-20">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-satvik-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading...</p>
          </div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
      </div>
    </main>
  );
}

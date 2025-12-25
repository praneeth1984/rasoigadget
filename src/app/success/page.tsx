'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Button from '@/components/Button';
import Section from '@/components/Section';

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');

  return (
    <Section background="dark">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-dark-elevated rounded-2xl p-8 md:p-12 shadow-xl border-2 border-satvik-green">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-satvik-green rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-satvik-green mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Thank you for your purchase! Your Satvik 3-Book Collection is ready to download.
          </p>

          {/* Payment Details */}
          {paymentId && (
            <div className="bg-dark-surface rounded-lg p-6 mb-8 text-left">
              <h3 className="text-sm font-semibold text-text-muted uppercase mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Payment ID:</span>
                  <span className="text-text-primary font-mono text-sm">{paymentId}</span>
                </div>
                {orderId && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Order ID:</span>
                    <span className="text-text-primary font-mono text-sm">{orderId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Download Section */}
          <div className="bg-gradient-to-br from-satvik-green/20 to-saffron-orange/20 rounded-xl p-6 md:p-8 mb-8 border border-satvik-green/30">
            <h2 className="text-2xl font-bold text-satvik-green mb-4">
              Download Your Books
            </h2>
            <p className="text-text-secondary mb-6">
              Click the boxes below to download your complete Satvik collection and bonuses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Satvik 4-in-1 Meal Book', filename: 'Satvik_4_in1_Meal_BookFinal.pdf' },
                { title: 'Satvik Protein Book', filename: 'Satvik_Protein_BookFinal.pdf' },
                { title: 'Satvik Dessert Book', filename: 'Satvik_Dessert_Book_Final.pdf' },
                { title: 'Kids Meal Planner', filename: 'Kids-Meal-Planner.pdf', isBonus: true },
                { title: 'Monthly Meal Planner', filename: 'Monthly-Meal-Planner.pdf', isBonus: true },
              ].map((book, index) => (
                <a
                  key={index}
                  href={`/downloads/${book.filename}`}
                  download
                  className={`bg-dark-elevated hover:bg-dark-surface border rounded-lg p-4 transition-all group text-left ${book.isBonus ? 'border-saffron-orange/30 hover:border-saffron-orange' : 'border-satvik-green/30 hover:border-satvik-green'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${book.isBonus ? 'bg-saffron-orange/10 text-saffron-orange' : 'bg-satvik-green/10 text-satvik-green'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${book.isBonus ? 'text-saffron-orange' : 'text-satvik-green'}`}>
                        {book.isBonus ? 'Bonus' : 'Main Book'}
                      </span>
                      <p className="text-text-primary font-semibold text-sm line-clamp-1 group-hover:text-satvik-green transition-colors">{book.title}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-4 bg-dark-bg/50 rounded-lg border border-satvik-green/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-satvik-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-satvik-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm text-left">
                  Files are in PDF format. We recommend saving them to your device immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 text-text-secondary text-sm">
            <p>
              📧 A confirmation email with download links has been sent to your email address.
            </p>
            <p>
              💾 Save these files to your device. You have <span className="text-satvik-green font-semibold">lifetime access</span> to all downloads.
            </p>
            <p>
              ❓ Need help? Contact us at <a href="mailto:support@rasoigadget.com" className="text-satvik-green hover:text-satvik-green-light">support@rasoigadget.com</a>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 pt-8 border-t border-satvik-green/20">
            <a href="/">
              <Button size="large" variant="secondary">
                Back to Home
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
    <main className="min-h-screen bg-dark-bg pt-20">
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
    </main>
  );
}

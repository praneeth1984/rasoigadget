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
          <div className="bg-gradient-to-br from-satvik-green/20 to-saffron-orange/20 rounded-xl p-8 mb-8 border border-satvik-green/30">
            <h2 className="text-2xl font-bold text-satvik-green mb-4">
              Download Your Books
            </h2>
            <p className="text-text-secondary mb-6">
              Click the buttons below to download each book. All three books are included in your purchase.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Book 1: Satvik Foundations', filename: 'satvik-foundations.pdf' },
                { title: 'Book 2: Celebration & Festivities', filename: 'satvik-celebrations.pdf' },
                { title: 'Book 3: Daily Wellness', filename: 'satvik-wellness.pdf' },
              ].map((book, index) => (
                <a
                  key={index}
                  href={`/downloads/${book.filename}`}
                  download
                  className="bg-dark-elevated hover:bg-dark-surface border border-satvik-green/30 hover:border-satvik-green rounded-lg p-4 transition-all group"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-6 h-6 text-satvik-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-satvik-green font-semibold group-hover:text-satvik-green-light">Download</span>
                  </div>
                  <p className="text-text-secondary text-sm">{book.title}</p>
                </a>
              ))}
            </div>

            <div className="mt-6 p-4 bg-dark-surface rounded-lg border border-saffron-orange/30">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-saffron-orange flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-left">
                  <p className="text-text-primary font-semibold mb-1">Bonus Materials Included!</p>
                  <p className="text-text-secondary text-sm">
                    Check your email for the bonus meal planning guide, recipe cards, and shopping guides.
                  </p>
                </div>
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

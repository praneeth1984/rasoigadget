'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';

interface ArchivedOrder {
  id: string;
  orderNumber: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  financialStatus: string | null;
  paidAt: string | null;
  fulfillmentStatus: string | null;
  createdAt: string;
  subtotal: number | null;
  shipping: number | null;
  taxes: number | null;
  total: number | null;
  discountCode: string | null;
  discountAmount: number | null;
  paymentMethod: string | null;
  paymentReference: string | null;
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingZip: string | null;
  billingCountry: string | null;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingZip: string | null;
  shippingCountry: string | null;
  notes: string | null;
}

export default function ArchivedOrderDetailPage(props: { params: Promise<{ orderId: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [order, setOrder] = useState<ArchivedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import('@/lib/auth').then(({ isAdmin }) => {
      if (!isAdmin()) {
        router.push('/admin/login');
        return;
      }
      fetchOrderDetails();
    });
  }, [params.orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/admin/archived-orders/${params.orderId}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || 'Failed to fetch order details');
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('An error occurred while fetching order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-dark-bg pt-24 pb-12">
          <Section>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-satvik-green mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading order details...</p>
            </div>
          </Section>
        </main>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-dark-bg pt-24 pb-12">
          <Section>
            <div className="bg-dark-elevated rounded-2xl p-8 border border-red-500/20 text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Error</h2>
              <p className="text-red-400 mb-6">{error || 'Order not found'}</p>
              <Button onClick={() => router.back()}>Go Back</Button>
            </div>
          </Section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-bg pt-24 pb-12">
        <Section>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-dark-elevated text-text-secondary transition-colors"
                aria-label="Go back"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <SectionTitle>Order Details: {order.orderNumber}</SectionTitle>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${
              order.financialStatus === 'paid' ? 'bg-satvik-green/20 text-satvik-green' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {order.financialStatus?.toUpperCase()}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-satvik-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Order Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-text-muted text-xs uppercase font-bold mb-1">Order Date</p>
                    <p className="text-text-primary">
                      {new Date(order.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'full',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase font-bold mb-1">Payment Method</p>
                    <p className="text-text-primary">{order.paymentMethod || 'N/A'}</p>
                    {order.paymentReference && (
                      <p className="text-text-secondary text-xs mt-1">Ref: {order.paymentReference}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-satvik-green/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-text-primary">₹{order.subtotal?.toFixed(2)}</span>
                  </div>
                  {order.shipping !== null && order.shipping > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-text-secondary">Shipping</span>
                      <span className="text-text-primary">₹{order.shipping?.toFixed(2)}</span>
                    </div>
                  )}
                  {order.taxes !== null && order.taxes > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-text-secondary">Taxes</span>
                      <span className="text-text-primary">₹{order.taxes?.toFixed(2)}</span>
                    </div>
                  )}
                  {order.discountAmount !== null && order.discountAmount > 0 && (
                    <div className="flex justify-between mb-2 text-red-400">
                      <span>Discount ({order.discountCode})</span>
                      <span>-₹{order.discountAmount?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between mt-4 pt-4 border-t border-satvik-green/20 text-xl font-bold">
                    <span className="text-text-primary">Total</span>
                    <span className="text-satvik-green">₹{order.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Notes</h3>
                  <p className="text-text-secondary whitespace-pre-wrap">{order.notes}</p>
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="space-y-8">
              <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-satvik-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-text-muted text-xs uppercase font-bold mb-1">Name</p>
                    <p className="text-text-primary font-medium">{order.customerName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase font-bold mb-1">Email</p>
                    <a href={`mailto:${order.customerEmail}`} className="text-satvik-green hover:underline">
                      {order.customerEmail || 'N/A'}
                    </a>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase font-bold mb-1">Phone</p>
                    <p className="text-text-primary">{order.customerPhone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-satvik-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Billing Address
                </h3>
                <div className="text-text-secondary leading-relaxed">
                  {order.billingAddress ? (
                    <>
                      <p>{order.billingAddress}</p>
                      <p>{order.billingCity}, {order.billingState} {order.billingZip}</p>
                      <p>{order.billingCountry}</p>
                    </>
                  ) : (
                    <p>Not provided</p>
                  )}
                </div>
              </div>

              {order.shippingAddress && (
                <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20">
                  <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-satvik-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Shipping Address
                  </h3>
                  <div className="text-text-secondary leading-relaxed">
                    <p>{order.shippingAddress}</p>
                    <p>{order.shippingCity}, {order.shippingState} {order.shippingZip}</p>
                    <p>{order.shippingCountry}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}

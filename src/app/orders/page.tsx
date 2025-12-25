'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import { getCurrentUser, clearSession, isAuthenticated } from '@/lib/auth';

interface Order {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  currency: string;
  status: string;
  productName: string;
  createdAt: string;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getCurrentUser());

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchOrders(currentUser.email);
    }
  }, [router]);

  const fetchOrders = async (emailToFetch: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(emailToFetch)}`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  const downloadFiles = () => {
    const files = [
      { title: 'Book 1: Satvik Foundations', filename: 'satvik-foundations.pdf' },
      { title: 'Book 2: Celebration & Festivities', filename: 'satvik-celebrations.pdf' },
      { title: 'Book 3: Daily Wellness', filename: 'satvik-wellness.pdf' },
    ];

    files.forEach(file => {
      const link = document.createElement('a');
      link.href = `/downloads/${file.filename}`;
      link.download = file.filename;
      link.click();
    });
  };

  // Orders Dashboard (Logged In)
  if (!user) {
    return (
      <main className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-royal-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-bg pt-20">
      <Section background="dark">
        <div className="max-w-4xl mx-auto">
          {/* Header with Logout */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <SectionTitle subtitle="View your purchase history and download your ebooks">
                My Orders
              </SectionTitle>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-dark-elevated rounded-2xl p-6 mb-8 border border-satvik-green/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-satvik-green/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-satvik-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Logged in as</p>
                  <p className="text-text-primary font-semibold">{user.email}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="small">
                Logout
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-dark-elevated rounded-2xl p-8 text-center border border-satvik-green/20">
              <div className="w-16 h-16 border-4 border-satvik-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading your orders...</p>
            </div>
          )}

          {/* Orders List */}
          {!loading && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-dark-elevated rounded-2xl p-8 text-center border border-satvik-green/20">
                  <div className="w-16 h-16 mx-auto mb-4 bg-saffron-orange/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-saffron-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No Orders Found</h3>
                  <p className="text-text-secondary mb-4">
                    We couldn't find any orders associated with this email address.
                  </p>
                  <p className="text-sm text-text-muted">
                    If you believe this is an error, please contact support.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-satvik-green/20 to-saffron-orange/20 rounded-xl p-6 border border-satvik-green/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-satvik-green mb-1">
                          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Found
                        </h3>
                        <p className="text-text-secondary text-sm">
                          You have lifetime access to download your ebooks
                        </p>
                      </div>
                    </div>
                    <Button onClick={downloadFiles} size="large">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download All Books
                    </Button>
                  </div>

                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-dark-elevated rounded-2xl p-6 border border-satvik-green/20 hover:border-satvik-green/40 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-satvik-green mb-2">
                            {order.productName}
                          </h3>
                          <div className="space-y-1 text-sm text-text-secondary">
                            <p>
                              <span className="text-text-muted">Order ID:</span>{' '}
                              <span className="font-mono">#{order.id}</span>
                            </p>
                            <p>
                              <span className="text-text-muted">Transaction ID:</span>{' '}
                              <span className="font-mono text-xs">{order.razorpayPaymentId}</span>
                            </p>
                            <p>
                              <span className="text-text-muted">Date:</span>{' '}
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-satvik-green">
                              ₹{(order.amount / 100).toFixed(2)}
                            </p>
                            <span className="px-2 py-0.5 rounded-full bg-satvik-green/20 text-satvik-green text-[10px] uppercase font-bold tracking-wider">
                              {order.status}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <a 
                              href={`/api/orders/${order.id}/invoice`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-dark-surface border border-satvik-green/30 text-satvik-green rounded-lg text-sm font-semibold hover:bg-satvik-green/10 transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Invoice
                            </a>
                            <Button onClick={downloadFiles} variant="primary" size="small">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              Download Books
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}

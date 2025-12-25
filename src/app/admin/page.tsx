'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, clearSession, isAdmin } from '@/lib/auth';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';

interface Order {
  id: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  currency: string;
  status: string;
  productName: string;
  customerEmail: string;
  customerName: string | null;
  customerPhone: string | null;
  customerState: string | null;
  createdAt: string;
  user: {
    email: string;
    name: string | null;
  };
}

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  uniqueCustomers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'settings' | 'contacts'>('orders');
  const [settings, setSettings] = useState<{ productImage?: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/admin/login');
      return;
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchAllOrders();
      fetchSettings();
      fetchContactRequests();
    }
  }, [router]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      const data = await response.json();
      if (data.success) {
        setSettings(prev => ({ ...prev, [key]: data.setting?.value || value }));
        setSaveMessage('Setting updated successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to update setting');
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      setSaveMessage('Error updating setting');
    } finally {
      setIsSaving(false);
    }
  };

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/all-orders');
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
        calculateStats(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactRequests = async () => {
    try {
      const response = await fetch('/api/admin/contact-requests');
      const data = await response.json();
      if (data.success) {
        setContactRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching contact requests:', error);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/contact-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (data.success) {
        setContactRequests(prev => 
          prev.map(req => req.id === id ? { ...req, status } : req)
        );
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const calculateStats = (orders: Order[]) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount / 100), 0);
    const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;
    
    setStats({ totalOrders, totalRevenue, uniqueCustomers });
  };

  const handleLogout = () => {
    clearSession();
    router.push('/admin/login');
  };

  const filteredOrders = orders.filter(order =>
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.razorpayOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = contactRequests.filter(req =>
    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Date', 'Order ID', 'Payment ID', 'Customer Email', 'Customer Name', 'Phone', 'Amount', 'Status'];
    const rows = orders.map(order => [
      new Date(order.createdAt).toLocaleString('en-IN'),
      order.razorpayOrderId,
      order.razorpayPaymentId,
      order.customerEmail,
      order.customerName || '',
      order.customerPhone || '',
      (order.amount / 100).toFixed(2),
      order.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

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
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <SectionTitle subtitle="Manage orders, configurations and contact requests">
                Admin Dashboard
              </SectionTitle>
              <div className="flex flex-wrap gap-4 mt-4">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    activeTab === 'orders' 
                    ? 'bg-satvik-green text-white shadow-lg shadow-satvik-green/20' 
                    : 'bg-dark-elevated text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Orders
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    activeTab === 'settings' 
                    ? 'bg-satvik-green text-white shadow-lg shadow-satvik-green/20' 
                    : 'bg-dark-elevated text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Store Settings
                </button>
                <button 
                  onClick={() => setActiveTab('contacts')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    activeTab === 'contacts' 
                    ? 'bg-satvik-green text-white shadow-lg shadow-satvik-green/20' 
                    : 'bg-dark-elevated text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Contact Requests
                </button>
              </div>
            </div>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </div>

          {/* Statistics Cards */}
          {activeTab === 'orders' && stats && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-satvik-green/20 to-satvik-green/10 rounded-xl p-6 border border-satvik-green/30">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-8 h-8 text-satvik-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-text-muted text-sm font-semibold uppercase">Total Revenue</h3>
                </div>
                <p className="text-3xl font-bold text-satvik-green">₹{stats.totalRevenue.toFixed(2)}</p>
              </div>

              <div className="bg-gradient-to-br from-saffron-orange/20 to-saffron-orange/10 rounded-xl p-6 border border-saffron-orange/30">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-8 h-8 text-saffron-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <h3 className="text-text-muted text-sm font-semibold uppercase">Total Orders</h3>
                </div>
                <p className="text-3xl font-bold text-saffron-orange">{stats.totalOrders}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <h3 className="text-text-muted text-sm font-semibold uppercase">Unique Customers</h3>
                </div>
                <p className="text-3xl font-bold text-blue-400">{stats.uniqueCustomers}</p>
              </div>
            </div>
          )}

          <div className="min-h-[400px]">
            {activeTab === 'orders' ? (
              <>
                {/* Search and Export */}
                <div className="bg-dark-elevated rounded-2xl p-6 mb-6 border border-satvik-green/20">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by email, name, order ID, or payment ID..."
                        className="w-full px-4 py-3 bg-dark-surface border border-satvik-green/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-satvik-green transition-colors"
                      />
                    </div>
                    <Button onClick={exportToCSV} variant="secondary">
                      Export to CSV
                    </Button>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="bg-dark-elevated rounded-2xl border border-satvik-green/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-surface border-b border-satvik-green/20">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Payment ID</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-satvik-green/10">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                              No orders found
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-dark-surface transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                <span className="font-bold text-royal-purple">#{order.id}</span>
                                <br />
                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <div className="text-text-primary font-medium">{order.customerName || 'N/A'}</div>
                                <div className="text-text-secondary text-xs">{order.customerEmail || '(No Email)'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-secondary">
                                <a 
                                  href={`/api/orders/${order.id}/invoice`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-royal-purple hover:underline flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  View Invoice
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-secondary">
                                {order.razorpayPaymentId}
                              </td>
                              <td className="px-6 py-4 font-bold text-satvik-green">
                                ₹{(order.amount / 100).toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'completed' 
                                    ? 'bg-satvik-green/20 text-satvik-green' 
                                  : order.status === 'draft'
                                    ? 'bg-royal-purple/20 text-royal-purple'
                                  : order.status === 'failed'
                                    ? 'bg-red-500/20 text-red-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {order.status === 'draft' ? 'Draft (Abandoned)' : order.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {filteredOrders.length > 0 && (
                  <div className="mt-4 text-center text-text-muted text-sm">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </div>
                )}
              </>
            ) : activeTab === 'settings' ? (
              <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-text-primary mb-6">Store Configuration</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-text-secondary text-sm font-medium mb-2">
                      Hero Product Image URL
                    </label>
                    <input
                      type="text"
                      value={settings.productImage || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, productImage: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 bg-dark-surface border border-satvik-green/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-satvik-green transition-colors mb-4"
                    />
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={() => updateSetting('productImage', settings.productImage || '')}
                        loading={isSaving}
                        disabled={isSaving}
                      >
                        Save Configuration
                      </Button>
                      {saveMessage && (
                        <span className={`text-sm font-medium ${saveMessage.includes('Failed') ? 'text-red-400' : 'text-emerald'}`}>
                          {saveMessage}
                        </span>
                      )}
                    </div>
                  </div>

                  {settings.productImage && (
                    <div className="mt-8">
                      <p className="text-text-secondary text-sm font-medium mb-4">Preview (approx):</p>
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-satvik-green/20 max-w-[200px]">
                        <img 
                          src={settings.productImage} 
                          alt="Product Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Search contacts */}
                <div className="bg-dark-elevated rounded-2xl p-6 mb-6 border border-satvik-green/20">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search contact requests..."
                    className="w-full px-4 py-3 bg-dark-surface border border-satvik-green/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-satvik-green transition-colors"
                  />
                </div>

                {/* Contacts Table */}
                <div className="bg-dark-elevated rounded-2xl border border-satvik-green/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dark-surface border-b border-satvik-green/20">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Subject & Message</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-satvik-green/10">
                        {filteredContacts.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">
                              No contact requests found
                            </td>
                          </tr>
                        ) : (
                          filteredContacts.map((req) => (
                            <tr key={req.id} className="hover:bg-dark-surface transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                {new Date(req.createdAt).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <div className="text-text-primary font-medium">{req.name}</div>
                                <div className="text-text-secondary text-xs">{req.email}</div>
                                {req.phone && <div className="text-text-muted text-[10px]">{req.phone}</div>}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <div className="text-text-primary font-bold mb-1">{req.subject}</div>
                                <div className="text-text-secondary line-clamp-2 max-w-md">{req.message}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select 
                                  value={req.status}
                                  onChange={(e) => updateContactStatus(req.id, e.target.value)}
                                  className={`px-3 py-1 text-xs font-semibold rounded-full outline-none bg-dark-bg border ${
                                    req.status === 'resolved' 
                                      ? 'border-satvik-green text-satvik-green' 
                                    : req.status === 'in_progress'
                                      ? 'border-yellow-500 text-yellow-400'
                                    : 'border-royal-purple text-royal-purple'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="resolved">Resolved</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';

interface ArchivedOrder {
  id: string;
  orderNumber: string;
  customerName: string | null;
  customerEmail: string | null;
  total: number | null;
  createdAt: string;
  financialStatus: string | null;
}

export default function ArchivedOrdersTab() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [archivedOrders, setArchivedOrders] = useState<ArchivedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchivedOrders();
  }, []);

  const fetchArchivedOrders = async () => {
    try {
      const response = await fetch('/api/admin/archived-orders');
      const data = await response.json();
      if (data.success) {
        setArchivedOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching archived orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  const handleImport = async () => {
    if (!file) {
      setMessage('Please select a CSV file');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/import-archived-orders', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.message}`);
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('csv-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        // Refresh the list
        fetchArchivedOrders();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Import Section */}
      <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20">
        <h3 className="text-2xl font-bold text-text-primary mb-6">Import Archived Orders</h3>
        
        <div className="space-y-6">
          <div>
            <p className="text-text-secondary text-sm mb-4">
              Import historical orders from Shopify CSV export. Orders will be stored separately for archival purposes.
            </p>
            
            <div className="bg-dark-surface rounded-lg p-4 mb-4">
              <h4 className="text-text-primary font-semibold mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside text-text-secondary text-sm space-y-1">
                <li>Export orders from Shopify as CSV</li>
                <li>Select the CSV file below</li>
                <li>Click "Import Orders"</li>
                <li>Duplicate orders will be automatically skipped</li>
              </ol>
            </div>

            <label className="block text-text-secondary text-sm font-medium mb-2">
              Select CSV File
            </label>
            <input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-dark-surface border border-satvik-green/30 rounded-lg text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-satvik-green file:text-white hover:file:bg-satvik-green-dark cursor-pointer"
            />
            
            {file && (
              <p className="text-text-muted text-sm mt-2">
                Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={handleImport}
              loading={uploading}
              disabled={uploading || !file}
            >
              {uploading ? 'Importing...' : 'Import Orders'}
            </Button>
            
            {message && (
              <span className={`text-sm font-medium ${message.includes('❌') ? 'text-red-400' : 'text-emerald'}`}>
                {message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Archived Orders List */}
      <div className="bg-dark-elevated rounded-2xl border border-satvik-green/20 overflow-hidden">
        <div className="p-6 border-b border-satvik-green/20">
          <h3 className="text-xl font-bold text-text-primary">
            Archived Orders ({archivedOrders.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-text-secondary">
            Loading archived orders...
          </div>
        ) : archivedOrders.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No archived orders found. Import a CSV file to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-surface border-b border-satvik-green/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Order #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-satvik-green/10">
                {archivedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-dark-surface transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-text-primary font-medium">{order.customerName || 'N/A'}</div>
                      <div className="text-text-secondary text-xs">{order.customerEmail || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                      ₹{order.total?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.financialStatus === 'paid' 
                          ? 'bg-satvik-green/20 text-satvik-green' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.financialStatus || 'unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

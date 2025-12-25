'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function ArchivedOrdersTab() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

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
    <div className="bg-dark-elevated rounded-2xl p-8 border border-satvik-green/20 max-w-2xl mx-auto">
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
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadRazorpayScript, createOrder, verifyPayment, RazorpayOptions } from '@/lib/razorpay';
import { trackAddPaymentInfo, trackPurchase } from '@/lib/facebook-pixel';
import { getCurrentUser } from '@/lib/auth';

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initiatePayment = async (amount: number, customerInfo?: { name: string; email: string; contact: string; state: string }) => {
    try {
      setIsLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      // Create order
      const orderData = await createOrder(amount, customerInfo);
      if (!orderData.success) {
        alert('Failed to create order. Please try again.');
        return;
      }

      // Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Rasoi Gadget',
        description: 'The Satvik 3-Book Collection',
        order_id: orderData.orderId,
        prefill: {
          name: customerInfo?.name || '',
          email: customerInfo?.email || '',
          contact: customerInfo?.contact || '',
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verificationData = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer_email: customerInfo?.email || options.prefill?.email || '',
              customer_name: customerInfo?.name || options.prefill?.name || '',
              customer_phone: customerInfo?.contact || options.prefill?.contact || '',
              customer_state: customerInfo?.state || (typeof window !== 'undefined' ? localStorage.getItem('userState') || '' : ''),
              amount: orderData.amount,
            });

            if (verificationData.success) {
              // Track successful purchase
              trackPurchase(
                amount,
                verificationData.orderId,
                verificationData.paymentId,
                orderData.currency
              );

              // Redirect to success page
              router.push(
                `/success?payment_id=${verificationData.paymentId}&order_id=${verificationData.orderId}&email=${encodeURIComponent(customerInfo?.email || options.prefill?.email || '')}`
              );
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        theme: {
          color: '#9FCC7C', // Satvik Green
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      
      // Track when payment info is added (Razorpay opens)
      razorpay.on('payment.failed', function (response: any) {
        alert('Payment failed. Please try again.');
        console.error('Payment failed:', response.error);
      });
      
      razorpay.open();
      
      // Track add payment info event
      trackAddPaymentInfo(amount, orderData.currency);
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiatePayment,
    isLoading,
  };
};

'use client';

import { CheckoutSession } from '@/types/stripeTypes';
import { useState } from 'react';
import request from '@/utils/request';

interface CheckoutProps {
  amount: number;
  packageId: string;
}

export default function CheckoutPage({ amount, packageId }: CheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const { data } = await request.post<CheckoutSession>('/api/stripe/create-checkout-session', {
        amount,
        packageId,
      });
      window.location.href = data.url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-orange text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : 'Proceed to Payment'}
    </button>
  );
}
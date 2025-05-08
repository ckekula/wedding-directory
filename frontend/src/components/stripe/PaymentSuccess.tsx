import { StripeSession } from '@/types/stripeTypes';
import { redirect } from 'next/navigation';
import request from '@/utils/request';
import { ReactElement } from 'react';
import Link from 'next/link';

interface PageProps {
  searchParams: { session_id?: string };
}

export default async function PaymentSuccess({ 
  searchParams 
}: PageProps): Promise<ReactElement> {
  const { session_id } = searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen bg-lightYellow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Invalid Session
          </h1>
          <p className="text-gray-600">
            No valid session ID provided. Please try again.
          </p>
        </div>
      </div>
    );
  }

  try {
    const { data: session } = await request.get<StripeSession>(
      `/api/stripe/session?session_id=${session_id}`
    );

    if (session.status === 'open') {
      redirect('/');
      // Add a return statement after redirect for TypeScript
      return <></>;
    }

    if (session.status === 'complete') {
      return (
        <div className="min-h-screen bg-lightYellow flex items-center justify-center py-12">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-600 mb-4">
                Payment Successful!
              </h1>
              <div className="mb-6">
                <svg
                  className="w-16 h-16 text-green-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                We appreciate your business! A confirmation email will be sent to{' '}
                <span className="font-semibold">{session.customer_details.email}</span>
              </p>
              <p className="text-gray-500 text-sm mb-8">
                If you have any questions, please email{' '}
                <a
                  href="mailto:senani.online@gmail.com"
                  className="text-orange hover:text-orange-600"
                >
                  senani.online@gmail.com
                </a>
              </p>
              
              {/* Navigation Buttons */}
              <div className="flex flex-col space-y-4">
                <Link
                  href="/visitor-dashboard"
                  className="w-full bg-orange text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/visitor-dashboard/payments-history"
                  className="w-full border-2 border-orange text-orange py-2 px-4 rounded-md hover:bg-orange hover:text-white transition-colors font-medium"
                >
                  View My Payments
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    return (
      <div className="min-h-screen bg-lightYellow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Processing Payment
          </h1>
          <p className="text-gray-600">
            There was an error processing your payment. Please try again or contact support.
          </p>
        </div>
      </div>
    );
  }

  // Default return in case none of the conditions are met
  return (
    <div className="min-h-screen bg-lightYellow flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-orange mb-4">
          Processing Payment
        </h1>
        <p className="text-gray-600">
          Please wait while we process your payment...
        </p>
      </div>
    </div>
  );
}
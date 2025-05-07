import PaymentSuccess from '@/components/stripe/PaymentSuccess';
import { Suspense } from 'react';
import LoaderJelly from '@/components/shared/Loaders/LoaderJelly';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <Suspense fallback={<LoaderJelly />}>
      {/* @ts-expect-error - Async Server Component */}
      <PaymentSuccess searchParams={searchParams} />
    </Suspense>
  );
}
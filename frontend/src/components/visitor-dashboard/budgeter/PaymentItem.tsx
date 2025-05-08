import React from 'react';
import { PaymentData } from '@/types/budgeterTypes';

interface PaymentItemProps {
  payment: PaymentData;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ payment }) => {
  const paymentDate = new Date(payment.createdAt).toLocaleDateString();
  const status = payment.status || 'Pending';
  const packagePrice = payment.package.pricing || 0;
  const amountPaid = payment.amount || 0;

    const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 ring-green-600/20 ring-1 ring-inset';
      case 'PENDING':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 ring-1 ring-inset';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20 ring-1 ring-inset';
    }
  };

  return (
    <div className="border rounded-lg bg-gray-50">
      <div className="grid grid-cols-[1fr,200px,200px,50px] gap-4 px-6 py-4">
        <div>
          <h3 className="font-medium font-body">{payment.package.offering.name}</h3>
          <p className="text-sm text-gray-500">Package: {payment.package.name}</p>
          <p className="text-sm text-gray-500">Payment Date: {paymentDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Package Price</p>
          <p className="text-gray-600 font-body">
            {packagePrice.toLocaleString()} LKR
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount Paid</p>
          <p className="text-gray-600 font-body">
            {amountPaid.toLocaleString()} LKR
          </p>
        </div>
        <div className="flex justify-end items-start">
          <span className={`
            px-2.5 py-1.5 
            text-xs font-medium
            rounded-md
            ${getStatusStyle(status)}
          `}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
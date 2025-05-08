import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { AmountPaidProps, PaidPercentage } from '@/types/budgeterTypes';

ChartJS.register(ArcElement, Tooltip, Legend);

const AmountPaid:React.FC<AmountPaidProps> = ({ amountPaid = 0.00, totalCost= 0.00 }) => {
    const paidPercentage: PaidPercentage = totalCost > 0 
    ? ((amountPaid / totalCost) * 100).toFixed(0)
    : "0";

  const data = {
    datasets: [
      {
        data: [Number(paidPercentage), 100 - Number(paidPercentage)],
        backgroundColor: ['#FF7262', '#E5E7EB'],
        borderWidth: 0,
        circumference: 360,
        rotation: -90,
      },
    ],
  };

  const options = {
    cutout: '85%',
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm flex items-center gap-8">
      <div className="relative h-32 w-32">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-semibold font-body">{paidPercentage}%</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 font-body">Amount Paid</h2>
        <p className="text-2xl font-semibold font-body">{amountPaid.toLocaleString()} LKR</p>
      </div>
    </div>
  );
};

export default AmountPaid;
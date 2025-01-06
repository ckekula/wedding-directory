import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { TotalCostProps, UtilizationPercentage } from '@/types/budgeterTypes';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalCost: React.FC<TotalCostProps> = ({ totalCost = 0.00, budget = 0.00 })  => {
  const utilizationPercentage: UtilizationPercentage = ((totalCost / budget) * 100).toFixed(0);

  const data = {
    datasets: [
      {
        data: [Number(utilizationPercentage), 100 - Number(utilizationPercentage)],
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
    <div className="bg-white rounded-lg border p-6 shadow-sm  flex items-center gap-8">
      <div className="relative h-32 w-32">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-semibold">
            {utilizationPercentage}%
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Total Cost</h2>
        <p className="text-2xl font-semibold mb-2">
          {totalCost.toLocaleString()} LKR
        </p>
        <div className="text-gray-600 text-sm font-body">
          <p>Your Budget</p>
          <p>{budget.toLocaleString()} LKR</p>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
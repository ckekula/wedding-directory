import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const BudgetHeader = ({ budget = 0.00, totalCost = 0.00 }) => {
  const utilizationPercentage = ((totalCost / budget) * 100).toFixed(2);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/visitor-dashboard" },
    { label: "Budgeter" },
  ];

  return (
    <div className="flex justify-between border p-4 rounded-lg shadow-sm bg-white">
      <div>
        <Breadcrumbs items={breadcrumbItems} />
        <p className="font-title text-[40px]">My Budgeting Tool</p>
        <p className="font-title text-[20px]">
          Plan your wedding expenses effectively and stay within budget.
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-body text-[20px]">You&apos;ve utilized</p>
        <p className="font-title text-[48px]">{utilizationPercentage}%</p>
        <p className="font-body text-[20px]">of your budget</p>
      </div>
    </div>
  );
};

export default BudgetHeader;

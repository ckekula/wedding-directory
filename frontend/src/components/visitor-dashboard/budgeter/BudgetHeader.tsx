import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const BudgetHeader: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Visitor Dashboard", href: "/visitor-dashboard" },
    { label: "Budgeter" },
  ]
  return (
    <div className="flex justify-between border p-4 rounded-lg shadow-sm bg-gray-50">
      <div>
        <Breadcrumbs items={breadcrumbItems}/>
        <p>My Budgeting Tool</p>
        <p>Plan your wedding expenses effectively and stay within budget.</p>

      </div>
      <div className="flex flex-col items-end">
        <p>
          You&#39;ve utilized
        </p>
        <p>
          97%
        </p>
        <p>
          of your budget
        </p>

      </div>
    </div>
  );
};
export default BudgetHeader;

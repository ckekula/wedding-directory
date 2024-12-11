"use client";

import React from "react";
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState } from "react";

const BudgeterPage = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);

  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/visitor-dashboard" },
            { label: "Budgeter", href: "/budgeter" },
          ]}
        />
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          SayIDo Budgeter
        </h1>
        <p className="text-gray-600">
          Plan your wedding expenses effectively and stay within budget.
        </p>
      </div>

      {/* Budgeter UI */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        {/* Total Budget Section */}
        <div className="mb-6">
          <label htmlFor="totalBudget" className="block text-gray-700 font-medium">
            Total Budget (LKR)
          </label>
          <input
            id="totalBudget"
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter your total budget"
          />
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example Category */}
            <div className="p-4 bg-lightYellow border border-gray-300 rounded shadow">
              <h3 className="text-lg font-medium text-gray-700">Venue</h3>
              <p className="text-sm text-gray-500">Allocated Budget: 0 LKR</p>
              <input
                type="number"
                placeholder="Enter amount"
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            {/* Add more categories as needed */}
            <div className="p-4 bg-lightYellow border border-gray-300 rounded shadow">
              <h3 className="text-lg font-medium text-gray-700">Catering</h3>
              <p className="text-sm text-gray-500">Allocated Budget: 0 LKR</p>
              <input
                type="number"
                placeholder="Enter amount"
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-primary text-white font-semibold rounded shadow hover:bg-primary-dark"
          >
            Add Category
          </button>
        </div>

        {/* Budget Summary */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Budget Summary</h2>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">Total Allocated Budget:</p>
            <p className="text-gray-900 font-bold">0 LKR</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600">Remaining Budget:</p>
            <p className="text-gray-900 font-bold">0 LKR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgeterPage;

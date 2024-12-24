"use client";

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from "@apollo/client";
import { GET_BUDGET_TOOL } from '@/graphql/queries';
import BudgetHeader from '@/components/visitor-dashboard/budgeter/BudgetHeader';
import TotalCost from '@/components/visitor-dashboard/budgeter/TotalCost';
import AmountPaid from '@/components/visitor-dashboard/budgeter/AmountPaid';



const BudgeterPage = () => {
  const params = useParams();
  const { visitorId } = params;

  // Fetch the budget tool and items
  const { data, loading, error } = useQuery(GET_BUDGET_TOOL, {
    variables: { visitorId },
    skip: !visitorId, // Prevent query until visitorId is available
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const budgetTool = data?.budgetTool;

  if (!budgetTool) {
    return <div>No budget tool found for this visitor.</div>;
  }

  const { totalBudget, visitor, budgetItems, createdAt, updatedAt } = budgetTool;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BudgetHeader/>
      <div className="flex justify-between items-center gap-6">
        <TotalCost/>
        <AmountPaid/>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">Budget Tool Details</h1>

      {/* Budget Summary */}
      <div className="mb-6">
        <p><strong>Budget ID:</strong> {budgetTool.id}</p>
        <p><strong>Total Budget:</strong> ${totalBudget}</p>
        <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
        <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</p>
        <p><strong>Visitor Email:</strong> {visitor?.email}</p>
      </div>

      {/* Budget Items */}
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Budget Items</h2>
      {budgetItems.length === 0 ? (
        <p>No budget items added yet.</p>
      ) : (
        <ul className="space-y-4">
          {budgetItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <div>
                <p><strong>Item:</strong> {item.itemName}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Estimated Cost:</strong> ${item.estimatedCost}</p>
                <p><strong>Amount Paid:</strong> ${item.amountPaid}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {item.isPaidInFull ? (
                    <span className="text-green-600 font-bold">Paid in Full</span>
                  ) : (
                    <span className="text-red-600 font-bold">Pending</span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgeterPage;

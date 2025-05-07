import React from "react";
import { DollarSign } from "lucide-react";
import ActionButton from "../common/ActionButton";
import EmptyStateDisplay from "../common/EmptyStateDisplay";

interface BudgetWidgetProps {
  budgetTotal: number;
  budgetSpent: number;
  budgetPercentage: number;
  visitorId: string | undefined;
}

const BudgetWidget: React.FC<BudgetWidgetProps> = ({
  budgetTotal,
  budgetSpent,
  budgetPercentage,
  visitorId,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-100">
        <h3 className="text-xl font-title font-semibold flex items-center text-gray-800">
          <DollarSign className="mr-3 h-5 w-5 text-orange-500" />
          Budget Tracker
        </h3>
      </div>
      <div className="p-6 font-body font-normal">
        <p className="text-gray-600 mb-5">
          Track your wedding expenses and stay on budget.
        </p>

        {budgetTotal > 0 ? (
          <>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-gray-600">
                Spent:{" "}
                <span className="text-orange-500">
                  LKR{budgetSpent.toLocaleString()}
                </span>
              </span>
              <span className="text-gray-600">
                Total:{" "}
                <span className="text-gray-800">
                  LKR{budgetTotal.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-5">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  budgetPercentage > 90 ? "bg-red-500" : "bg-orange"
                }`}
                style={{ width: `${budgetPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mb-5 text-center">
              Budget used:{" "}
              <span className="font-semibold text-orange-500">
                {budgetPercentage}%
              </span>
            </p>
          </>
        ) : (
          <EmptyStateDisplay Icon={DollarSign} message="No budget set up yet" />
        )}

        <ActionButton
          href={`/visitor-dashboard/budgeter/${visitorId}`}
          label="Manage budget"
        />
      </div>
    </div>
  );
};

export default BudgetWidget;

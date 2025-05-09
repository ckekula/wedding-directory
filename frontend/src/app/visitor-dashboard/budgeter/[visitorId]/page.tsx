"use client"
import { useQuery } from '@apollo/client';
import { GET_BUDGET_TOOL } from '@/graphql/queries';
import { useParams } from 'next/navigation';
import BudgetHeader from '@/components/visitor-dashboard/budgeter/BudgetHeader';
import TotalCost from '@/components/visitor-dashboard/budgeter/TotalCost';
import AmountPaid from '@/components/visitor-dashboard/budgeter/AmountPaid';
import BudgetItemsPanel from '@/components/visitor-dashboard/budgeter/BudgetItemsPanel';
import CreateBudgetTool from '@/components/visitor-dashboard/budgeter/CreateBudgetTool';
import { BudgetItemData } from '@/types/budgeterTypes';

interface Package {
  pricing?: number;
  offering?: {
    category?: string;
  };
}

interface Payment {
  amount: number;
  package?: Package;
}

const BudgeterPage = () => {
  const { visitorId } = useParams() as { visitorId: string };

  const { data, loading, error } = useQuery(GET_BUDGET_TOOL, {
    variables: { visitorId },
    skip: !visitorId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const budgetTool = data?.budgetTool;
  const budgetToolId: string = data?.budgetTool?.id;
  const visitorPayments = data?.visitorPayments || [];

  // Process payments by category
  const paymentsByCategory = visitorPayments.reduce((acc: { [key: string]: number }, payment: Payment) => {
    if (payment.package?.offering?.category) {
      const category = payment.package.offering.category;
      acc[category] = (acc[category] || 0) + payment.amount;
    }
    return acc;
  }, {});

  if (budgetToolId == null) {
    return <div className="p-6 max-w-[1064px] items-center">
      <CreateBudgetTool visitorId={visitorId}/>
    </div>;
  }

  // Calculate total cost including both budget items and package prices
  const totalCost = budgetTool.budgetItems.reduce((sum:number, item: BudgetItemData) => {
    return sum + item.estimatedCost;
  }, 0) + visitorPayments.reduce((sum: number, payment: Payment) => {
    return sum + (payment.package?.pricing || 0);
  }, 0);

  // Calculate amount paid including both manual entries and payment amounts
  const amountPaid = budgetTool.budgetItems.reduce((sum:number, item: BudgetItemData) => {
    const categoryPayments = paymentsByCategory[item.category] || 0;
    return sum + item.amountPaid + categoryPayments;
  }, 0) + visitorPayments.reduce((sum: number, payment: Payment) => {
    return sum + (payment.amount || 0);
  }, 0);

  // Add defaulted values for safety
const safeAmountPaid = amountPaid || 0;
const safeTotalCost = totalCost || 0;

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <BudgetHeader budget={budgetTool.totalBudget} totalCost={totalCost} />
      <div className="grid grid-cols-2 gap-[5px] py-[5px]">
        <TotalCost totalCost={safeTotalCost} budget={budgetTool.totalBudget} />
        <AmountPaid amountPaid={safeAmountPaid} totalCost={totalCost} />
      </div>
      <div>
        <BudgetItemsPanel 
          budgetToolId={budgetToolId}
          visitorId={visitorId}
          categoryPayments={paymentsByCategory}
          payments={visitorPayments} // Add this new prop
        />
      </div>
    </div>
  );
};

export default BudgeterPage;
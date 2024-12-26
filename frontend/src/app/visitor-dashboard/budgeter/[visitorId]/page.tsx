"use client"
import { useQuery } from '@apollo/client';
import { GET_BUDGET_ITEMS, GET_BUDGET_TOOL } from '@/graphql/queries';
import { useParams } from 'next/navigation';
import BudgetHeader from '@/components/visitor-dashboard/budgeter/BudgetHeader';
import TotalCost from '@/components/visitor-dashboard/budgeter/TotalCost';
import AmountPaid from '@/components/visitor-dashboard/budgeter/AmountPaid';
import BudgetItem from '@/components/visitor-dashboard/budgeter/BudgetItem';
import BudgetItemsPanel from '@/components/visitor-dashboard/budgeter/BudgetItemsPanel';

const BudgeterPage = () => {
  const params = useParams();
  const { visitorId } = params;

  const { data, loading, error } = useQuery(GET_BUDGET_TOOL, {
    variables: { visitorId },
    skip: !visitorId,
  });



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const budgetTool = data?.budgetTool;
  const budgetToolId: string = data?.budgetTool.id;

  if (!budgetTool) {
    return <div>No budget tool found for this visitor.</div>;
  }

  const totalCost = budgetTool.budgetItems.reduce((sum:number, item) => sum + item.estimatedCost, 0);
  const amountPaid = budgetTool.budgetItems.reduce((sum:number, item) => sum + item.amountPaid, 0);

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <BudgetHeader budget={budgetTool.totalBudget} totalCost={totalCost} />
      <div className="grid grid-cols-2 gap-[5px] py-[5px]">
        <TotalCost totalCost={totalCost} budget={budgetTool.totalBudget} />
        <AmountPaid amountPaid={amountPaid} totalCost={totalCost} />
      </div>
      <div>
        <BudgetItemsPanel budgetToolId={budgetToolId}/>
      </div>
    </div>
  );
};

export default BudgeterPage;

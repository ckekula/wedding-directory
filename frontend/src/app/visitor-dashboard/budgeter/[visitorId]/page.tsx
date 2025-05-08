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
  const paymentsByCategory = visitorPayments.reduce((acc: { [key: string]: number }, payment: any) => {
    try {
      // Debug logging
      console.log('Processing payment:', {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        category: payment.package?.offering?.category,
        serviceName: payment.package?.offering?.name,
        createdAt: payment.createdAt,
        packageName: payment.package?.name,
        packagePrice: payment.package?.pricing,
      });

      // Check if payment has required properties
      if (payment.package?.offering?.category) {
        const category = payment.package.offering.category;
        
        // Include all payments regardless of status
        acc[category] = (acc[category] || 0) + payment.amount;
        
        // Debug logging for category total
        console.log(`Category ${category} total:`, acc[category]);
      } else {
        console.warn('Payment missing category information:', payment);
      }
    } catch (error) {
      console.error('Error processing payment:', error, payment);
    }
    return acc;
  }, {});

  // Debug log final results
  console.log('Final payments by category:', paymentsByCategory);

  if (budgetToolId == null) {
    return <div className="p-6 max-w-[1064px] items-center">
      <CreateBudgetTool visitorId={visitorId}/>
    </div>;
  }

  // Calculate total cost including both budget items and payments
  const totalCost = budgetTool.budgetItems.reduce((sum:number, item: BudgetItemData) => {
    const categoryPayment = paymentsByCategory[item.category] || 0;
    return sum + item.estimatedCost;
  }, 0);

  // Calculate amount paid including both manual entries and payments
  const amountPaid = budgetTool.budgetItems.reduce((sum:number, item: BudgetItemData) => {
    const categoryPayment = paymentsByCategory[item.category] || 0;
    return sum + item.amountPaid + categoryPayment;
  }, 0);

  return (
    <div className="p-6 max-w-[1064px] items-center">
      <BudgetHeader budget={budgetTool.totalBudget} totalCost={totalCost} />
      <div className="grid grid-cols-2 gap-[5px] py-[5px]">
        <TotalCost totalCost={totalCost} budget={budgetTool.totalBudget} />
        <AmountPaid amountPaid={amountPaid} totalCost={totalCost} />
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
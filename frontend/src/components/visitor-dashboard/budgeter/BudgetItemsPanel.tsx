import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BUDGET_ITEMS } from '@/graphql/queries';
import BudgetItem from '@/components/visitor-dashboard/budgeter/BudgetItem';

const BudgetItemsPanel = ({budgetToolId}) => {

  const {
    data: budgetItemsData,
    loading: budgetItemsLoading,
    error: budgetItemsError
  } = useQuery(GET_BUDGET_ITEMS, {
    variables: {budgetToolId},
    skip: !budgetToolId,
  });


  if (budgetItemsLoading) return <div>Loading...</div>;
  if (budgetItemsError) return <div>Error: {budgetItemsError.message}</div>;
  const budgetItems = budgetItemsData?.budgetItems || [];
  return (
    <div className="bg-white rounded-lg border">
      {budgetItems.map((item) => (
        <BudgetItem
          key={item.id}
          itemName={item.itemName}
          estimatedCost={item.estimatedCost}
          paidAmount={item.amountPaid}
          category={item.category}
          specialNotes={item.specialNotes}
          onSave={(data) => {
            // Handle save logic
            console.log('Saving:', data);
          }}
          onDelete={(data) => {
            // Handle delete logic
            console.log('Deleting:', data);
          }}
        />
      ))}
    </div>
  );
};
export default BudgetItemsPanel;

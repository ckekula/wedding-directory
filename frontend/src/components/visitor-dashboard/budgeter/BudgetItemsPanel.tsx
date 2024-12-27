import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BUDGET_ITEMS } from '@/graphql/queries';
import BudgetItem from '@/components/visitor-dashboard/budgeter/BudgetItem';
import { Search, Plus } from 'lucide-react';
import { UPDATE_BUDGET_ITEM } from '@/graphql/mutations';
import BudgetItemPopup from '@/components/visitor-dashboard/budgeter/BudgetItemPopup';

const BudgetItemsPanel = ({ budgetToolId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    data: budgetItemsData,
    loading: budgetItemsLoading,
    error: budgetItemsError,
    refetch: refetchBudgetItems
  } = useQuery(GET_BUDGET_ITEMS, {
    variables: { budgetToolId },
    skip: !budgetToolId,
  });

  const [updateBudgetItem, { loading: updateLoading }] = useMutation(UPDATE_BUDGET_ITEM, {
    onCompleted: () => {
      // Refetch to get updated data
      refetchBudgetItems();
    },
    onError: (error) => {
      console.error('Error updating budget item:', error);
      // You might want to add toast notification here
    }
  });

  const handleUpdateBudgetItem = async (itemId, data) => {
    try {
      const input = {
        itemName: data.itemName,
        category: data.category,
        estimatedCost: data.estimatedCost,
        amountPaid: data.paidAmount,
        specialNotes: data.specialNotes,
        isPaidInFull: data.isPaidInFull
      };

      await updateBudgetItem({
        variables: {
          id: itemId,
          input: input
        }
      });
    } catch (error) {
      console.error('Error in handleUpdateBudgetItem:', error);
    }
  };

  if (budgetItemsLoading) return <div>Loading...</div>;
  if (budgetItemsError) return <div>Error: {budgetItemsError.message}</div>;

  const budgetItems = budgetItemsData?.budgetItems || [];
  const totalItems = budgetItems.length;
  const paidInFullItems = budgetItems.filter(item => item.isPaidInFull).length;

  const filteredItems = budgetItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b-slate-300">
        <h2 className="text-2xl font-semibold">Budget List</h2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Total Budget Items:</span>
            <span className="font-semibold">{totalItems}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Items Paid Full:</span>
            <span className="font-semibold">{paidInFullItems}</span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF7262] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#ff8576] transition-colors"
          >
            <Plus size={20} />
            Add Budget Item
          </button>
        </div>
      </div>

      <BudgetItemPopup
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        budgetToolId={budgetToolId}
        onItemAdded={() => refetchBudgetItems()}
      />

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Budget Items"
          className="w-[300px] pl-10 pr-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-[1fr,200px,200px,50px] gap-4 px-6 py-2 text-gray-600">
        <div>Item</div>
        <div>Estimate/Cost</div>
        <div>Paid</div>
        <div></div>
      </div>

      {/* Budget Items */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <BudgetItem
            key={item.id}
            itemName={item.itemName}
            estimatedCost={item.estimatedCost}
            paidAmount={item.amountPaid}
            category={item.category}
            specialNotes={item.specialNotes}
            onSave={(data) => {
              handleUpdateBudgetItem(item.id, data);
            }}
            onDelete={(data) => {
              console.log('Deleting:', data);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetItemsPanel;
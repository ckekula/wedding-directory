import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BUDGET_ITEMS } from '@/graphql/queries';
import BudgetItem from '@/components/visitor-dashboard/budgeter/BudgetItem';
import { Search, Plus } from 'lucide-react';
import { DELETE_BUDGET_ITEM, UPDATE_BUDGET_ITEM } from '@/graphql/mutations';
import BudgetItemPopup from '@/components/visitor-dashboard/budgeter/BudgetItemPopup';
import { toast } from 'react-hot-toast';
import PaymentItem from './PaymentItem';

import { BudgetItemsPanelProps, BudgetItemData, UpdateBudgetItemInput, PaymentData } from '@/types/budgeterTypes';

const BudgetItemsPanel: React.FC<BudgetItemsPanelProps> = ({ 
  budgetToolId,
  categoryPayments = {}, // Add default empty object for categoryPayments
  payments = [] // Add payments with default empty array
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const {
    data: budgetItemsData,
    loading: budgetItemsLoading,
    error: budgetItemsError,
    refetch: refetchBudgetItems
  } = useQuery(GET_BUDGET_ITEMS, {
    variables: { budgetToolId },
    skip: !budgetToolId,
  });

  const [updateBudgetItem] = useMutation(UPDATE_BUDGET_ITEM, {
    onCompleted: () => {
      // Refetch to get updated data
      refetchBudgetItems().then(
        () => toast.success('Budget item updated successfully'));
    },
    onError: (error) => {
      console.error('Error updating budget item:', error);
      toast.error('Error updating budget item' );
    }
  });

  const [deleteBudgetItem] = useMutation(DELETE_BUDGET_ITEM, {
    onCompleted: () => {
      refetchBudgetItems().then(
        () => toast.success('Budget item deleted successfully'));
    },
    onError: (error) => {
      toast.error('Error deleting budget item: ' + error.message);
    }
  });

  const handleUpdateBudgetItem = async (itemId: string, data: UpdateBudgetItemInput) => {
    try {
      const formattedData = {
        ...data,
        amountPaid: data.paidAmount, // ✅ Map paidAmount to amountPaid
      };
      delete formattedData.paidAmount; // ✅ Remove incorrect field

      await updateBudgetItem({
        variables: {
          id: itemId,
          updateBudgetItemInput: formattedData,
        },
      });
    } catch (error) {
      console.error('Error in handleUpdateBudgetItem:', error);
    }
  };


  const handleDeleteBudgetItem = async (itemId: string) => {
    try {
      await deleteBudgetItem({
        variables: {
          id: itemId
        }
      });
    } catch (error) {
      console.error('Error in handleDeleteBudgetItem:', error);
    }
  };

  if (budgetItemsLoading) return <div>Loading...</div>;
  if (budgetItemsError) return <div>Error: {budgetItemsError.message}</div>;

  const budgetItems: BudgetItemData[] = budgetItemsData?.budgetItems || [];
  const totalItems = budgetItems.length;
  
  // Update paidInFullItems calculation to include external payments
  const paidInFullItems = budgetItems.filter((item) => {
    const categoryPaidAmount = categoryPayments[item.category] || 0;
    const totalPaidAmount = item.amountPaid + categoryPaidAmount;
    return totalPaidAmount >= item.estimatedCost;
  }).length;

  const filteredItems = budgetItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBudgetItems = () => {
    // Group items by category
    const groupedItems = filteredItems.reduce((acc: { [key: string]: BudgetItemData[] }, item) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    // Group payments by category
    const groupedPayments = payments.reduce((acc: { [key: string]: PaymentData[] }, payment) => {
      if (payment.package?.offering?.category) {
        const category = payment.package.offering.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(payment);
      }
      return acc;
    }, {});

    // Combine unique categories from both items and payments
    const allCategories = new Set([
      ...Object.keys(groupedItems),
      ...Object.keys(groupedPayments)
    ]);

    // Render items by category
    return Array.from(allCategories).map((category) => (
      <div key={category} className="mb-6">
        {/* Category Header */}
        <div className="bg-gray-50 px-6 py-3 rounded-t-lg border-b font-semibold text-gray-700">
          {category}
        </div>

        {/* Category Items */}
        <div className="space-y-2 mt-2">
          {/* Render Budget Items */}
          {groupedItems[category]?.map((item) => (
            <BudgetItem
              key={`item-${item.id}`}
              itemId={item.id}
              itemName={item.itemName}
              estimatedCost={item.estimatedCost}
              paidAmount={item.amountPaid}
              category={item.category}
              specialNotes={item.specialNotes}
              onSave={(data) => handleUpdateBudgetItem(item.id, data)}
              onDelete={() => handleDeleteBudgetItem(item.id)}
              externalPayments={categoryPayments[item.category] || 0}
            />
          ))}

          {/* Render Related Payments */}
          {groupedPayments[category]?.map((payment) => (
            <PaymentItem
              key={`payment-${payment.id}`}
              payment={payment}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b-slate-300">
        <h2 className="text-2xl font-semibold font-body">Budget List</h2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-body">Total Budget Items:</span>
            <span className="font-semibold">{totalItems}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-body">Items Paid Full:</span>
            <span className="font-semibold">{paidInFullItems}</span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF7262] text-white px-6 py-2 rounded-full flex items-center gap-2 font-body hover:bg-[#ff8576] transition-colors"
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

      {/* Budget Items grouped by category */}
      <div>
        {renderBudgetItems()}
      </div>
    </div>
  );
};

export default BudgetItemsPanel;
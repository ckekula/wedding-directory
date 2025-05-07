import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_BUDGET_ITEM } from '@/graphql/mutations';
import toast from 'react-hot-toast';
import { BudgetItemPopupProps } from '@/types/budgeterTypes';
import budgetCategories from "@/utils/budgetCategories";

const BudgetItemPopup: React.FC<BudgetItemPopupProps> = ({
                                                           isOpen,
                                                           onClose,
                                                           budgetToolId,
                                                           onItemAdded,
                                                         }) => {
  const initialFormState = {
    itemName: '',
    category: '',
    estimatedCost: '',
    amountPaid: '',
    specialNotes: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const [createBudgetItem, { loading }] = useMutation(CREATE_BUDGET_ITEM, {
    onCompleted: () => {
      toast.success('Budget item added successfully');
      onItemAdded?.();
      onClose();
      setFormData(initialFormState);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const estimatedCost = parseFloat(formData.estimatedCost);
    const amountPaid = parseFloat(formData.amountPaid);

    if (isNaN(estimatedCost) || estimatedCost <= 0) {
      toast.error('Please enter a valid estimated cost');
      return;
    }

    if (isNaN(amountPaid)) {
      toast.error('Please enter a valid amount paid');
      return;
    }

    const input = {
      itemName: formData.itemName,
      category: formData.category,
      estimatedCost: estimatedCost,
      amountPaid: amountPaid || 0,
      specialNotes: formData.specialNotes,
      budgetToolId: budgetToolId
    };

    createBudgetItem({
      variables: {
        input
      }
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl font-bold font-body">
              Add new Budget Item
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-body">Item Name</label>
              <Input
                value={formData.itemName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    itemName: e.target.value,
                  }))
                }
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-body">Budget Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="  w-full rounded-md border border-input font-body bg-background px-3 h-10"
                required
              >
                {budgetCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-body">Estimate/Cost</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.estimatedCost}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      estimatedCost: e.target.value,
                    }))
                  }
                  placeholder="Enter estimated cost"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-body">Amount paid</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.amountPaid}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amountPaid: e.target.value,
                    }))
                  }
                  placeholder="Enter amount paid"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-body">Add Notes</label>
              <textarea
                value={formData.specialNotes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specialNotes: e.target.value,
                  }))
                }
                placeholder="Add related notes about your payments, advanced, due dates, options etc."
                className="w-full p-2 border rounded-lg h-24 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF7262] hover:bg-[#ff8576] text-white py-6 font-body"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Expense"}
            </Button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BudgetItemPopup;
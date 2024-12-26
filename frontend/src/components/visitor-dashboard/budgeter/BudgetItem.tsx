import React, { useState } from 'react';
import { ChevronUp, Trash2 } from 'lucide-react';

const BudgetItem = ({
                      itemName = "Reception Venue & Rentals",
                      estimatedCost = 145000,
                      paidAmount = 50000,
                      category = "Venues",
                      specialNotes = null,
                      onSave = () => {},
                      onDelete = () => {},
                    }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [notes, setNotes] = useState(specialNotes || '');

  const handleSave = () => {
    onSave({
      itemName,
      estimatedCost,
      paidAmount,
      category,
      specialNotes: notes
    });
  };

  const handleDelete = () => {
    onDelete({
      itemName,
      estimatedCost,
      paidAmount,
      category,
      specialNotes: notes
    });
  };

  return (
    <div className="bg-white rounded-xl p-2 mx-6 shadow-sm border gap-y-1">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{itemName}</h3>
            <div className="flex items-center gap-8">
              <span className="font-medium">{estimatedCost.toLocaleString()} LKR</span>
              <span className="font-medium">{paidAmount.toLocaleString()} LKR</span>
              <ChevronUp className={`transform transition-transform ${isOpen ? '' : 'rotate-180'}`} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Category:</span>
            <span>{category}</span>
          </div>

          <div className="space-y-2">
            <textarea
              className="w-full border rounded-lg p-3 text-gray-600"
              placeholder="Add related notes about your payments, advanced, due dates, options etc."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
              Delete Item
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
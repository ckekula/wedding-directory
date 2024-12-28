import React, { useState } from 'react';
import { ChevronUp, Trash2 } from 'lucide-react';

const BudgetItem = ({
                      itemId,
                      itemName = "Reception Venue & Rentals",
                      estimatedCost = 145000,
                      paidAmount = 50000,
                      category = "Venues",
                      specialNotes = null,
                      onSave = () => {},
                      onDelete = () => {},
                    }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedValues, setEditedValues] = useState({
    itemName,
    estimatedCost,
    paidAmount,
    category,
    specialNotes: specialNotes || '',
  });

  const handleInputChange = (field, value) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Check if estimated cost equals amount paid
    const isPaidInFull = editedValues.estimatedCost === editedValues.paidAmount;

    // Pass all values including isPaidInFull to the save handler
    onSave({
      ...editedValues,
      isPaidInFull
    });

    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(editedValues);
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <div
        className="grid grid-cols-[1fr,200px,200px,50px] gap-4 px-6 py-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium font-body">{itemName}</div>
        <div className="text-gray-600 font-body">
          {estimatedCost.toLocaleString()} LKR
        </div>
        <div className="text-gray-600 font-body">
          {paidAmount.toLocaleString()} LKR
        </div>
        <div className="flex justify-end">
          <ChevronUp
            className={`transform transition-transform ${
              isOpen ? "" : "rotate-180"
            }`}
            size={20}
          />
        </div>
      </div>

      {isOpen && (
        <div className="px-6 py-4 border-t space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                value={editedValues.itemName}
                onChange={(e) => handleInputChange("itemName", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={editedValues.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 font-body">
                Estimated Cost (LKR)
              </label>
              <input
                type="number"
                value={editedValues.estimatedCost}
                onChange={(e) =>
                  handleInputChange("estimatedCost", parseFloat(e.target.value))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="font-body block text-sm font-medium text-gray-700">
                Amount Paid (LKR)
              </label>
              <input
                type="number"
                value={editedValues.paidAmount}
                onChange={(e) =>
                  handleInputChange("paidAmount", parseFloat(e.target.value))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className=" font-body block text-sm font-medium text-gray-700">
              Special Notes
            </label>
            <textarea
              value={editedValues.specialNotes}
              onChange={(e) =>
                handleInputChange("specialNotes", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
              placeholder="Add any special notes here..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="flex font-body items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
              Delete Item
            </button>
            <button
              className="px-4 font-body py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
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
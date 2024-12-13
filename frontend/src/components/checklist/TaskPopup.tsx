import React, { useState } from "react";

interface TaskPopupProps {
  category: string | null;
  onClose: () => void;
}

const TaskPopup: React.FC<TaskPopupProps> = ({ category, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [notes, setNotes] = useState("");

  const isAddButtonDisabled = !taskName || !selectedCategory;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task name"
            className="w-full border rounded px-4 py-2"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Due date (optional)"
            className="w-full border rounded px-4 py-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            className="w-full border rounded px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {/* Add options dynamically if required */}
            <option value="Venue">Venue</option>
            <option value="Wedding Website">Wedding Website</option>
            <option value="Photos and Videos">Photos and Videos </option>
            <option value="Food and Drink">Food and Drink</option>
            <option value="Attire">Attire</option>
            <option value="Music">Music</option>
            <option value="Flowers & Decor">Flowers & Decor</option>
            <option value="Registry">Registry</option>
            <option value="Invitations and Paper">Invitations and Paper</option>
          </select>
          <textarea
            placeholder="Notes (optional)"
            className="w-full border rounded px-4 py-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={1000}
          ></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            disabled={isAddButtonDisabled}
            className={`px-4 py-2 rounded text-white ${
              isAddButtonDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange"
            }`}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;

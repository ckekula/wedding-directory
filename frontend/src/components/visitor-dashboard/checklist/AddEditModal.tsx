import React, { useState, useEffect } from "react";
import { TaskType } from "@/types/taskTypes";
import { AddEditTaskModalProps } from "@/types/taskTypes";
import { Button } from "../../ui/button";

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  // Initialize state with a reset function
  const [formData, setFormData] = useState<Omit<TaskType, "id">>({
    title: "",
    due_date: "",
    category: "",
    notes: "",
    completed: false,
  });

  // Use useEffect to reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Parse due_date to YYYY-MM-DD format if it's provided
        const formattedDueDate = initialData.due_date
          ? new Date(Number(initialData.due_date)).toISOString().split("T")[0] // Convert timestamp to "YYYY-MM-DD"
          : "";

        // If editing an existing task, populate with initial data
        setFormData({
          title: initialData.title || "",
          due_date: formattedDueDate,
          category: initialData.category || "",
          notes: initialData.notes || "",
          completed: initialData.completed || false,
        });
      } else {
        // If creating a new task, completely reset the form
        setFormData({
          title: "",
          due_date: "",
          category: "",
          notes: "",
          completed: false,
        });
      }
    }
  }, [isOpen, initialData]);

  const isFormValid = formData.title && formData.due_date && formData.category;

  const handleSave = () => {
    console.log("Save Button Pressed");
    console.log("Current Form Data:", formData);

    const payload = initialData
      ? { ...formData, id: initialData.id } // Editing an existing task
      : formData; // Creating a new task

    console.log("Payload to Save:", payload);
    onSave(payload);

    // Close the modal after saving
    onClose();
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center font-title">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>
        <input
          type="text"
          placeholder="Task Name"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border-2 rounded-lg font-body border-slate-600 p-2 mb-4  focus:border-orange outline-none"
        />
        <input
          type="date"
          value={formData.due_date}
          onChange={(e) =>
            setFormData({ ...formData, due_date: e.target.value })
          }
          className="w-full border-2 rounded-lg border-slate-600 font-body p-2 mb-4 focus:border-orange outline-none"
        />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full border-2  font-body rounded-lg border-slate-600 p-2 mb-4  focus:border-orange outline-none"
        >
          <option value="" className="font-body" disabled>
            Select a Category
          </option>
          {[
            "Venue",
            "Photos & Videos",
            "Food & Drink",
            "Attire",
            "Music",
            "Flower & Decor",
            "Registry",
            "Invitation & Paper",
            "Beauty",
            "Ceremony",
            "Guests",
            "Travel",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full border-2 rounded-lg border-slate-600 font-body p-2 mb-4  focus:border-orange outline-none"
        />
        <div className="flex justify-center">
          <Button
            variant="ornageOutline"
            onClick={onClose}
            className="mr-2 px-4 py-2 border-2 font-body text-md"
          >
            Cancel
          </Button>
          <Button
            variant="signup"
            onClick={handleSave}
            disabled={!isFormValid}
            className={` px-4 py-2 border-2 rounded-lg font-body text-md ${
              isFormValid ? "" : "cursor-not-allowed"
            }`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;

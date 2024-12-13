import React, { Fragment, useState } from "react";
import { TaskCategory } from "../../types/taskTypes";
import ChecklistCategory from "./ChecklistCategory";
import TaskPopup from "./TaskPopup";
import { Button } from "../ui/button";

interface ChecklistProps {
  categories: TaskCategory[];
}

const Checklist: React.FC<ChecklistProps> = ({ categories }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.map((category) => ({
    ...category,
    tasks: category.tasks.filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const completedTasks = categories.reduce(
    (total, category) =>
      total + category.tasks.filter((task) => task.completed).length,
    0
  );
  const totalTasks = categories.reduce(
    (total, category) => total + category.tasks.length,
    0
  );
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const handleAddTask = (category: string | null) => {
    setSelectedCategory(category);
    setShowPopup(true);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="max-w-4xl mx-0 py-6 font-merriweather w-4/5">
        <p className="text-sm text-gray-600 mb-2">
          Based on your wedding date:{" "}
          <span className=" font-merriweather text-decoration: underline">
            April 21, 2027
          </span>
        </p>

        <div className=" flex-col">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4  font-merriweather">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <div></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{progress}% Complete</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search tasks"
            className="border rounded px-4 py-2 w-full mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative inline-flex items-center">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`w-[53px] h-6 flex items-center rounded-full p-1 transition-colors ${
                showCompleted ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  showCompleted ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </button>
            <span className="ml-2 text-sm text-gray-700">Show Completed</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <ChecklistCategory
              key={category.id}
              category={category}
              showCompleted={showCompleted}
              onAddTask={() => handleAddTask(category.title)}
            />
          ))}
        </div>
        {showPopup && (
          <TaskPopup
            category={selectedCategory}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
      <Button variant="signup" onClick={() => handleAddTask(null)}>
        Add Task
      </Button>
    </div>
  );
};

export default Checklist;

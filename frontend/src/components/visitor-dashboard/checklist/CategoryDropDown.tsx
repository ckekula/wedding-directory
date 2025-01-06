import React, { useState } from "react";
import { TaskType } from "@/types/taskTypes";
import { Button } from "@/components/ui/button";
import TaskRow from "@/components/visitor-dashboard/checklist/TaskRow";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type CategoryDropdownProps = {
  category: string;
  tasks: TaskType[];
  onAddTask: () => void;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="mb-6 border-2 border-b-slate-300 rounded-lg">
      <div
        className="flex justify-between items-center bg-white border-b-slate-200 p-4 rounded-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2 className="text-lg font-bold font-title text-slate-800 ">
          {category} ({tasks.length})
        </h2>
        <div>
          {isOpen ? (
            <IoChevronUp className="text-xl text-slate-600" />
          ) : (
            <IoChevronDown className="text-xl text-slate-600" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="bg-white shadow p-4 rounded-b-lg ">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
                onToggleComplete={onToggleComplete}
              />
            ))
          ) : (
            <p className="text-slate-600 italic">No tasks in this category.</p>
          )}
          <Button
            variant="login"
            className="mt-2 text-sm ml-2"
            onClick={onAddTask}
          >
            Add Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

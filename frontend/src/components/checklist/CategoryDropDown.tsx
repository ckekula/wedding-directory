import React, { useState } from "react";
import TaskRow from "./TaskRow";
import { CategoryDropdownProps } from "@/types/taskTypes";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b p-3 m-2 border-slate-400">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-xl font-bold font-title">{category}</h3>
        <span>{open ? <IoIosArrowUp/> : <IoIosArrowDown/>}</span>
      </div>
      {open && (
        <div>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              onToggleComplete={onToggleComplete}
            />
          ))}
          <button className="text-blue-600 mt-2 flex" onClick={onAddTask}>
            <IoAddCircleOutline className="m-2"/> Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
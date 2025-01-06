import React, { useState } from "react";
import {TaskRowProps} from "@/types/taskTypes";
import { MdDelete } from "react-icons/md";

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [hover, setHover] = useState(false);

  const handleToggleComplete = () => {
    // Toggle the completion status
    onToggleComplete(task.id, !task.completed);
  };

  // In TaskRow component
  const formatDate = (timestamp: string | number) => {
    // Convert timestamp to Date object
    const date = new Date(parseInt(String(timestamp)));

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="flex justify-between p-2 border rounded hover:shadow-lg font-body m-2 border-slate-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mr-2"
        />
        <div>
          <span
            className={
              task.completed ? "line-through text-slate-700 font-semibold" : ""
            }
          >
            {task.title}
          </span>
          <p className="text-sm text-slate-600">
            Due: {formatDate(task.due_date)}
          </p>
        </div>
      </div>
      {hover && (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit()}
            className="text-blue-500 hover:font-semibold"
          >
            View details
          </button>
          <button onClick={onDelete} className="text-slate-500">
            <MdDelete
              size={20}
              className="hover:text-red-500 hover:text-bold"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskRow;

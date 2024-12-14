import React, { useState } from "react";
import { TaskCategory } from "../../types/taskTypes";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaUtensils,
  FaAngleDown,
  FaAngleUp,
  FaTrash, // Delete icon
} from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";
import { GiAmpleDress } from "react-icons/gi";
import { IoMdMusicalNotes, IoMdAddCircleOutline } from "react-icons/io";
import { FaGift } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

interface ChecklistCategoryProps {
  category: TaskCategory;
  showCompleted: boolean;
  onAddTask: () => void;
}

const ChecklistCategory: React.FC<ChecklistCategoryProps> = ({
  category,
  showCompleted,
  onAddTask,
}) => {
  const [tasks, setTasks] = useState(category.tasks);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

  const handleCheckboxChange = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case "Venue":
        return <FaMapMarkerAlt className="text-green-500 mr-2" size={28} />;
      case "Wedding Website":
        return <FaGlobe className="text-blue-500 mr-2" size={28} />;
      case "Photos and Videos":
        return <GoFileMedia className="text-blue-300 mr-2" size={28} />;
      case "Food and Drink":
        return <FaUtensils className="text-red-500 mr-2" size={28} />;
      case "Attire":
        return <GiAmpleDress className="text-pink-500 mr-2" size={28} />;
      case "Music":
        return <IoMdMusicalNotes className="text-purple-500 mr-2" size={28} />;
      case "Flowers & Decor":
        return <IoFlowerOutline className="text-green-500 mr-2" size={28} />;
      case "Registry":
        return <FaGift className="text-blue-500 mr-2" size={28} />;
      case "Invitations and Paper":
        return <MdMail className="text-yellow-500 mr-2" size={28} />;
      default:
        return <FaUtensils className="text-yellow-500 mr-2" size={28} />;
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {getCategoryIcon(category.title)}
          <h2 className="text-lg font-semibold">{category.title}</h2>
        </div>
        <span>{isExpanded ? <FaAngleUp /> : <FaAngleDown />}</span>
      </div>
      {isExpanded && (
        <div>
          <ul className="mt-4 space-y-2 py-4">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center py-2 hover:shadow-lg  hover:bg-gray-50 transition-shadow rounded relative ${
                  task.completed ? "line-through text-slate-500" : ""
                }`}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
              >
                {/* Checkbox and Task Name */}
                <label className="flex-1 items-center space-x-2 p-4 ">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id)}
                    className={`form-checkbox ${
                      task.completed
                        ? "text-blue-500 focus:ring-blue-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span>{task.name}</span>
                  <div className="text-sm text-slate-500 absolute bottom-0  mt-2">
                    Due {task.dueDate}
                  </div>
                </label>

                {/* Hover Menu */}
                {hoveredTaskId === task.id && (
                  <div className="absolute  right-2 flex space-x-2 items-center bg-white  rounded p-1">
                    <button className="text-slate-500 hover:text-red-600">
                      <FaTrash size={16} />
                    </button>
                    <p className="text-slate-500">|</p>
                    <button className="text-blue-500 hover:	text-decoration-line: underline text-sm">
                      View Details
                    </button>
                  </div>
                )}

                {/* Task Date at the bottom */}
                

                {/* Triple dots */}
                <BsThreeDots className="cursor-pointer text-gray-500" />
              </li>
            ))}
          </ul>
          <button
            onClick={onAddTask}
            className="mt-4 text-orange hover:underline text-sm"
          >
            <div className="flex ml-1">
              <IoMdAddCircleOutline className="mx-2" size={17} /> Add New Task
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChecklistCategory;

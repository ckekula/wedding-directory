import React, { useState } from "react";
import { TaskCategory } from "../../types/taskTypes";
import {
  
  FaGlobe,
  FaMapMarkerAlt,
  FaUtensils,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";
import { GiAmpleDress } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaGift } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";
interface ChecklistCategoryProps {
  category: TaskCategory;
  showCompleted: boolean;
}


const ChecklistCategory: React.FC<ChecklistCategoryProps> = ({
  category,
  showCompleted,
}) => {
  const [tasks, setTasks] = useState(category.tasks);
    const [isExpanded, setIsExpanded] = useState(false);
    

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
            return (
              <IoMdMusicalNotes className="text-purple-500 mr-2" size={28} />
            );

        case "Flowers & Decor":
            return (
              <IoFlowerOutline className="text-green-500 mr-2" size={28} />
            );
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
        <ul className="mt-4 space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 hover:shadow-md hover:bg-gray-50 transition-shadow rounded ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <label className="flex items-center space-x-2">
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
              </label>
              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistCategory;

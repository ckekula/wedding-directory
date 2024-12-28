import React from "react";
import { ProgressBarProps } from "@/types/taskTypes";



const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  // Ensure we don't divide by zero and handle edge cases
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-1">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Overall Progress</span>
        <span className="font-bold">{progress}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-orange h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${progress}%`,
            minWidth: progress > 0 ? "2rem" : 0, // Ensure some visibility when there's progress
          }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {completed} of {total} tasks completed
      </div>
    </div>
  );
};

export default ProgressBar;

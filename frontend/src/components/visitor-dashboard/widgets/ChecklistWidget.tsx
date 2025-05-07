import React from "react";
import { CheckSquare } from "lucide-react";
import ActionButton from "../common/ActionButton";
import EmptyStateDisplay from "../common/EmptyStateDisplay";

interface ChecklistWidgetProps {
  completedTasks: number;
  totalTasks: number;
  checklistProgress: number;
  visitorId: string | undefined;
}

const ChecklistWidget: React.FC<ChecklistWidgetProps> = ({
  completedTasks,
  totalTasks,
  checklistProgress,
  visitorId,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-100">
        <h3 className="font-title text-xl font-semibold flex items-center text-gray-800">
          <CheckSquare className="mr-3 h-5 w-5 text-orange-500" />
          Wedding Checklist
        </h3>
      </div>
      <div className="p-6 font-body font-normal">
        <p className="text-gray-600 mb-5">
          Stay on track with your wedding planning tasks.
        </p>

        {totalTasks > 0 ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Progress
              </span>
              <span className="text-sm font-bold text-orange-500">
                {checklistProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
              <div
                className="bg-orange h-3 rounded-full transition-all duration-500"
                style={{ width: `${checklistProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mb-5 text-center">
              <span className="font-semibold text-orange-500">
                {completedTasks}
              </span>{" "}
              of <span className="font-semibold">{totalTasks}</span> tasks
              completed
            </p>
          </>
        ) : (
          <EmptyStateDisplay Icon={CheckSquare} message="No tasks added yet" />
        )}

        <ActionButton
          href={`/visitor-dashboard/checklist/${visitorId}`}
          label="View checklist"
        />
      </div>
    </div>
  );
};

export default ChecklistWidget;

import React from "react";


interface EmptyStateDisplayProps {
  Icon: React.ElementType;
  message: string;
}

const EmptyStateDisplay: React.FC<EmptyStateDisplayProps> = ({
  Icon,
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 mb-2 bg-orange-50 rounded-lg">
      <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
        <Icon className="h-6 w-6 text-orange-400" />
      </div>
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
};

export default EmptyStateDisplay;

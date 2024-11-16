import React, { useState } from "react";

interface ServicesMenuProps {
  setActiveSection: (section: string) => void;
}

const ProfileMenu: React.FC<ServicesMenuProps> = ({ setActiveSection }) => {
  const [activeButton, setActiveButton] = useState("weddingDetails");

  const handleClick = (section: string) => {
    setActiveButton(section);
    setActiveSection(section);
  };

  return (
    <div className="container bg-white w-full sm:w-[330px] min-h-[200px] shadow-md rounded-2xl p-6 sm:p-8">
      <h2 className="font-title font-bold text-2xl sm:text-3xl text-center sm:text-left mb-4">
        Profile Settings
      </h2>

      <div className="h-px w-full bg-gray-300 mb-6"></div>

      <div className="flex flex-row justify-center sm:flex-col gap-3 sm:gap-4 px-2">
        <button
          onClick={() => handleClick("weddingDetails")}
          className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300
            ${activeButton === "weddingDetails"
            ? "bg-gray-100 text-gray-800 shadow-sm border border-gray-200"
            : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Wedding Details
        </button>

        <button
          onClick={() => handleClick("accountDetails")}
          className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300
            ${activeButton === "accountDetails"
            ? "bg-gray-100 text-gray-800 shadow-sm border border-gray-200"
            : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Account Details
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
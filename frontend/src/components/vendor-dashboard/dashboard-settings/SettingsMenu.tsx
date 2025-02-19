import React from "react";
import { ServicesMenuProps } from "@/types/serviceTypes";

const SettingsMenu: React.FC<ServicesMenuProps> = ({ setActiveSection }) => {
  return (
    <div className="container bg-white w-[280px] h-[320px] shadow-md rounded-2xl p-8">
      <h2 className="font-title font-bold text-[32px]">Settings</h2>
      <hr className="w-[131px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

      <div className="flex flex-col gap-4 font-title text-[20px] ">
        <button
          onClick={() => setActiveSection("general")}
          className="text-left"
        >
          General
        </button>
        <button
          onClick={() => setActiveSection("profile")}
          className="text-left"
        >
          Profile
        </button>
        <button
          onClick={() => setActiveSection("account")}
          className="text-left"
        >
          Account
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;

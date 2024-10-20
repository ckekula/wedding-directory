import { ServicesMenuProps } from "@/types/serviceTypes";
import React from "react";


const ServicesMenu: React.FC<ServicesMenuProps> = ({ setActiveSection }) => {
  return (
    <div className="container bg-white w-[280px] h-[320px] shadow-md rounded-2xl p-8">
      <h2 className="font-title font-bold text-[32px]">Services</h2>
      <hr className="w-[131px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

      {/* Left-align text within this div */}
      <div className="flex flex-col gap-4 font-title text-[20px] ">
        {/* Each button will update the active section */}
        <button
          onClick={() => setActiveSection("publicProfile")}
          className="text-left"
        >
          General
        </button>
        <button
          onClick={() => setActiveSection("socialContact")}
          className="text-left"
        >
          Social Links
        </button>
        <button
          onClick={() => setActiveSection("portfolio")}
          className="text-left"
        >
          Portfolio
        </button>
        <button
          onClick={() => setActiveSection("serviceSettings")}
          className="text-left"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default ServicesMenu;

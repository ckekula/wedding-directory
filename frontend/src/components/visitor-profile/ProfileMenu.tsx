import Link from "next/link";
import React from "react";

interface ServicesMenuProps {
  setActiveSection: (section: string) => void;
}

const ProfileMenu: React.FC<ServicesMenuProps> = ({ setActiveSection }) => {
  return (
    <div className="container bg-white w-[330px] h-[220px] shadow-md rounded-2xl p-8">
      <h2 className="font-title font-bold text-[32px]">Profile Settings</h2>
      <hr className="w-[230px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

      {/* Left-align text within this div */}
      <div className="flex flex-col gap-4 font-title text-[20px] ">
        {/* Each button will update the active section */}
        <button
          onClick={() => setActiveSection("weddingDetails")}
          className="text-left"
        >
          Wedding Details
        </button>
        <button
          onClick={() => setActiveSection("accountDetails")}
          className="text-left"
        >
          Account Details
        </button>
       
      </div>
    </div>
  );
};

export default ProfileMenu;

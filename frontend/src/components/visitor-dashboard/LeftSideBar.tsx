import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiHome, FiDollarSign, FiUsers } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface LeftSideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const [activeLink, setActiveLink] = useState<string>(""); // State to track the active link

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex justify-center font-body bg-white rounded-br-3xl rounded-tr-3xl shadow-md p-5 transition-all duration-300 ${
        isCollapsed
          ? "w-[55px] h-[132px] border-slate-800 border-solid border-2"
          : "w-64 h-[400px]"
      }`}
    >
      {/* Collapsed State */}
      {isCollapsed ? (
        <div className="flex justify-between items-stretch">
          {/* Toggle Button */}
          <button onClick={toggleSideBar} className="focus:outline-none">
            <FaChevronRight />
          </button>
        </div>
      ) : (
        /* Expanded State */
        <div className="flex justify-between">
          {/* Navigation Items */}
          <nav className="mt-10">
            <div className="space-y-8">
              {/* Dashboard Link */}
              <Link
                href="/visitor-dashboard"
                onClick={() => setActiveLink("/visitor-dashboard")} // Set active link
                className={`flex items-center transition-colors duration-300 ${
                  activeLink === "/visitor-dashboard"
                    ? "text-orange"
                    : "text-black"
                }`}
              >
                <FiHome className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Dashboard</span>
              </Link>

              {/* Checklist Link */}
              <Link
                href="/checklist"
                onClick={() => setActiveLink("/checklist")} // Set active link
                className={`flex items-center transition-colors duration-300 ${
                  activeLink === "/checklist" ? "text-orange" : "text-black"
                }`}
              >
                <IoMdCheckmarkCircleOutline className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Checklist</span>
              </Link>

              {/* Budgeter Link */}
              <Link
                href="/budgeter"
                onClick={() => setActiveLink("/budgeter")} // Set active link
                className={`flex items-center transition-colors duration-300 ${
                  activeLink === "/budgeter" ? "text-orange" : "text-black"
                }`}
              >
                <FiDollarSign className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Budgeter</span>
              </Link>

              {/* Guest List Link */}
              <Link
                href="/guest-list"
                onClick={() => setActiveLink("/guest-list")} // Set active link
                className={`flex items-center transition-colors duration-300 ${
                  activeLink === "/guest-list" ? "text-orange" : "text-black"
                }`}
              >
                <FiUsers className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Guest List</span>
              </Link>

              {/* Vendors Link */}
              <Link
                href="/vendors"
                onClick={() => setActiveLink("/vendors")} // Set active link
                className={`flex items-center transition-colors duration-300 ${
                  activeLink === "/vendors" ? "text-orange" : "text-black"
                }`}
              >
                <HiOutlineBriefcase className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Vendors</span>
              </Link>
            </div>
          </nav>

          {/* Toggle Button */}
          <div className="flex items-stretch ml-3">
            <button onClick={toggleSideBar} className="focus:outline-none">
              <FaChevronLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSideBar;

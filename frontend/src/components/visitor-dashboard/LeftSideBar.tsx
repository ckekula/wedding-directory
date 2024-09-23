import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiHome, FiDollarSign, FiUsers } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const LeftSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex justify-center font-body  bg-white rounded-br-3xl rounded-tr-3xl shadow-md p-5 transition-all duration-300 ${
        isCollapsed ? "w-[55px] h-[132px] border-slate-800 border-solid border-2 " : "w-64 h-[400px]"
      }`}
    >
      {/* Collapsed State */}
      {isCollapsed ? (
        <div className="flex  justify-between items-stretch  ">
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
              <Link
                href="/visitor-dashboard"
                className="flex items-center text-black transition-colors duration-300"
              >
                <FiHome className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Dashboard</span>
              </Link>

              <Link
                href="/checklist"
                className="flex items-center text-black transition-colors duration-300"
              >
                <IoMdCheckmarkCircleOutline className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Checklist</span>
              </Link>

              <Link
                href="/budgeter"
                className="flex items-center text-black transition-colors duration-300"
              >
                <FiDollarSign className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Budgeter</span>
              </Link>

              <Link
                href="/guest-list"
                className="flex items-center text-black transition-colors duration-300"
              >
                <FiUsers className="text-2xl w-[30px] h-[30px]" />
                <span className="ml-3">Guest List</span>
              </Link>

              <Link
                href="/vendors"
                className="flex items-center text-black transition-colors duration-300"
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

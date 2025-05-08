"use client";

import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiHome, FiDollarSign, FiUsers, FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChatDots } from "react-icons/bs";

interface LeftSideBarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  visitorId: string | null;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ isCollapsed, onToggleCollapse, visitorId }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/visitor-dashboard",
      icon: <FiHome className="w-5 h-5" />,
      label: "Dashboard"
    },
    {
      href: `/visitor-dashboard/checklist/${visitorId}`,
      icon: <IoMdCheckmarkCircleOutline className="w-5 h-5" />,
      label: "Checklist"
    },
    {
      href: `visitor-dashboard/budgeter/${visitorId}`,
      icon: <FiDollarSign className="w-5 h-5" />,
      label: "Budgeter"
    },
    {
      href: "/guest-list",
      icon: <FiUsers className="w-5 h-5" />,
      label: "Guest List"
    },
    {
      href: `visitor-dashboard/my-vendors/${visitorId}`,
      icon: <HiOutlineBriefcase className="w-5 h-5" />,
      label: "My Vendors"
    },
    {
      href: `/visitor-dashboard/chats/${visitorId}`,
      icon: <BsChatDots className="w-5 h-5" />,
      label: "Chats"
    },
    {
      href: "/visitor-dashboard/payments-history",
      icon: <FiClock className="w-5 h-5" />,
      label: "Payments History"
    }
  ];

  return (
    <div className="relative">
      {/* Collapse toggle button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50
          transition-all duration-200 ease-in-out z-10"
      >
        {isCollapsed ? (
          <FiChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <FiChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Sidebar container */}
      <div
        className={`
          bg-white font-title rounded-lg shadow-md transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-full'}
        `}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 rounded-md
                  transition-colors duration-200 ease-in-out
                  ${isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                  group
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={`
                  flex-shrink-0
                  ${isActive ? "text-orange-600" : "text-gray-500"}
                  ${isCollapsed ? 'mr-0' : 'mr-3'}
                  transition-all duration-200
                `}>
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <span className="text-sm font-medium transition-all duration-200">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs
                    rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity
                    whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default LeftSideBar;
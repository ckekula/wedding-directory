import React from "react";
import { HomeIcon, CheckIcon, DollarSignIcon, UsersIcon, StoreIcon } from "lucide-react"; // Replace with actual icons

const BottomNavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md w-full z-50 overflow-hidden md:hidden">
      <ul className="flex justify-around py-2 max-w-screen-sm mx-auto">
        <li>
          <a href="/dashboard" className="flex flex-col items-center text-sm">
            <HomeIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/checklist" className="flex flex-col items-center text-sm">
            <CheckIcon className="h-6 w-6" />
            <span>Checklist</span>
          </a>
        </li>
        <li>
          <a href="/budgeter" className="flex flex-col items-center text-sm">
            <DollarSignIcon className="h-6 w-6" />
            <span>Budgeter</span>
          </a>
        </li>
        <li>
          <a href="/guestlist" className="flex flex-col items-center text-sm">
            <UsersIcon className="h-6 w-6" />
            <span>Guestlist</span>
          </a>
        </li>
        <li>
          <a href="/vendors" className="flex flex-col items-center text-sm">
            <StoreIcon className="h-6 w-6" />
            <span>Vendors</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavigationBar;

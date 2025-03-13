"use client";
import React from "react";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full container">
      <h2 className="font-title text-[24px] font-bold">Quick Actions</h2>
      <hr className="w-[250px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
      <div className="mt-4 space-y-4 font-body text-[16px]">
        
          <Link href="#" className="flex items-center gap-2">
            <FaLink size={24} /> Add or Remove Service
          </Link>
        
        
          <Link href="#" className="flex items-center gap-2">
            <FaLink size={24} /> Edit Public Business Profile
          </Link>
        
          <Link href="#" className="flex items-center gap-2">
            <FaLink size={24}  /> Edit Portfolio
          </Link>

      </div>
    </div>
  );
};

export default QuickActions;

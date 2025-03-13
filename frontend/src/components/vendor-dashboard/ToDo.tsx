"use client";
import  Link  from "next/link";
import React from "react";
import { MdOpenInFull } from "react-icons/md";

const ToDo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg container w-full">
      <h2 className="font-title text-[24px] font-bold">To Do&#39;s</h2>
      <hr className="w-[250px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
      <div className="mt-4 font-body text-[16px]">
        <Link href="#" className="flex items-center gap-2">
          <MdOpenInFull size={24} /> Write about your services
          <MdOpenInFull size={24} /> Add a banner to your page
        </Link>
      </div>
    </div>
  );
};

export default ToDo;

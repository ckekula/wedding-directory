import { ServicesMenuProps } from "@/types/serviceTypes";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

const ServicesMenu: React.FC<ServicesMenuProps> = ({ setActiveSection }) => {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="container bg-white w-[280px] shadow-md rounded-2xl p-8">
      <Link href={`/services/${id}`}>
        <button className="text-black font-body hover:text-gray-500 mr-2">
          &larr;
        </button>
        back
      </Link>

      <h2 className="font-title font-bold text-[32px]">Services</h2>
      <hr className="w-[131px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

      <div className="flex flex-col gap-4 font-title text-[20px] ">
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
          onClick={() => setActiveSection("packages")}
          className="text-left"
        >
          Packages
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

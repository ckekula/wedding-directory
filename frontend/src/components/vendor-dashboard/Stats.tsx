// Stats.js
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";

const Stats = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center container">
      {/* Summary Stats Header */}
      <div className="text-center font-bold font-title mb-6">
        <p className="text-[32px]">Summary Stats</p>
      </div>

      {/* Stats Content */}
      <div className="flex items-center justify-center gap-52 w-5/6">
        {/* Profile Views */}
        <div className="flex flex-col items-center">
          <MdOutlineRemoveRedEye size={40} className="text-black" />
          <p className="text-[24px] font-bold">1.7K</p>
          <p className="text-[16px]">Profile Views</p>
        </div>

        {/* Favorites */}
        <div className="flex flex-col items-center">
          <IoMdHeart size={40} className="text-red-500" />
          <p className="text-[24px] font-bold">248</p>
          <p className="text-[16px]">Favorites</p>
        </div>

        {/* Leads */}
        <div className="flex flex-col items-center">
          <FaArrowTrendUp size={40} className="text-black" />
          <p className="text-[24px] font-bold">19</p>
          <p className="text-[16px]">Leads</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;

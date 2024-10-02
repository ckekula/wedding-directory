import React from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";

const Stats = () => {
  return (
    <div className="flex container items-center justify-center bg-white">
            <div className="text-[32px] container font-bold font-title items-center justify-center">
              <p>Summary </p>
              <p>Stats</p>
            </div>
            <div >
              <p>
                <MdOutlineRemoveRedEye size={20} /> 1.7K
              </p>
              <p>Profile Views</p>
            </div>
            <div>
              <p>
                <IoMdHeart className="text-red-500 " size={20} /> 1.7K
              </p>
              <p>Favourites</p>
            </div>
            <div>
              <p>
                <FaArrowTrendUp size={20} /> 19
              </p>
              <p>Leads</p>
            </div>
          </div>
  )
}

export default Stats
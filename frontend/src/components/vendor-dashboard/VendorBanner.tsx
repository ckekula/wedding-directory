"use client";
import Image from "next/image";
import React from "react";
import { FiHome } from "react-icons/fi";
interface VendorBannerProps {
  businessName: string;
}
const VendorBanner: React.FC<VendorBannerProps> = ({ businessName }) => {
  return (
    <div className="container relative w-screen h-[305px]">
      {/* Banner image */}
      <Image
        src='images/vendorBanner'
        alt="vendor banner dashboard image"
        fill={true}
        style={{ objectFit: "cover" }}
        className="w-screen h-[305px] rounded-xl"
      />

      {/* Business name div */}
      <div className="absolute bottom-4 left-4 bg-white text-black py-2 px-4 rounded-xl flex items-center">
        <FiHome
          className="mr-2 font-bold"
          size={20}
          style={{ strokeWidth: 2.5 }}
        />
        <p className="font-bold font-title text-[20px]">{businessName}</p>
      </div>
    </div>
  );
};

export default VendorBanner;

"use client";
import Image from "next/image";
import React from "react";
import vendorBanner from "../../assets/images/vendor/vendorBanner.jpg";

interface VendorBannerProps {
  businessName: string;
}
const VendorBanner: React.FC<VendorBannerProps> = ({ businessName }) => {
  return (
    <div className=" container relative w-screen h-[305px] ">
      {/* Set relative position and fixed height */}
      <Image
        src={vendorBanner}
        alt="vendor banner dashboard image"
        fill={true}
        style={{ objectFit: "cover" }}
        className="w-screen h-[305px] rounded-xl bg-opacity-100"
      />
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-white text-center">
        <p>{businessName}</p>
      </div>
    </div>
  );
};

export default VendorBanner;

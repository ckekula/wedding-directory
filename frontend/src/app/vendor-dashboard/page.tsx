import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Stats from "./dashboard/Stats";

const VendorDashBoard = () => {
  return (
    <div className="">
      <Header />
      <div className="bg-lightYellow min-h-screen">
        <div className="p-20">
          {/* Vendor Banner */}
          <VendorBanner businessName="John's Flower Shop" />
          <div className="flex justify-evenly items-center gap-10 container mt-10 mb-8">
            <div className="flex flex-col justify-center items-center">
              <p className=" font-body text-[20px]">Category</p>
              <p className=" font-body text-[15px]">Florist</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className=" font-body text-[20px]">Member Since</p>
              <p className=" font-body text-[15px]">2024</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className=" font-body text-[20px]">Rating</p>
              <p className=" font-body text-[15px]">4.9</p>
            </div>
          </div>
          <div className="flex">
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoard;

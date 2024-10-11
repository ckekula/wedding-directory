import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Stats from "@/components/vendor-dashboard/Stats";
import QuickActions from "@/components/vendor-dashboard/QuickActions";
import ToDo from "@/components/vendor-dashboard/ToDo";

const VendorDashBoard = () => {
  return (
    <div>
      <Header />
      <div className="bg-lightYellow">
        <div className="container mx-auto px-4 ">
          {/* Adjusted the top margin and padding of the h1 */}
          <h1 className="font-title text-[36px] text-black text-center  py-4">Welcome</h1>

          {/* Vendor Banner */}
          <VendorBanner businessName="John's Flower Shop" />

          {/* Category, Member Since, Rating */}
          <div className="flex justify-evenly items-center gap-10 mt-10 mb-8">
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

          {/* Stats */}
          <div className="flex justify-center">
            <Stats />
          </div>

          {/* Quick Actions and To Do's */}
          <div className="flex justify-between py-12 gap-10">
            <QuickActions />
            <ToDo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoard;

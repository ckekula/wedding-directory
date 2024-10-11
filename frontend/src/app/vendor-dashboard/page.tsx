import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Stats from "@/components/vendor-dashboard/Stats";
import QuickActions from "@/components/vendor-dashboard/QuickActions";
import ToDo from "@/components/vendor-dashboard/ToDo";
import ProfileInfo from "@/components/vendor-dashboard/ProfileInfo";
import VendorResult from "@/components/vendor-search/VendorResult";

const VendorDashBoard = () => {
  return (
    <div>
      <Header />
      <div className="bg-lightYellow min-h-screen">
        <div className="container mx-auto px-4 pt-10 ">
          <ProfileInfo />

          {/* Quick Actions and To Do's */}
          <div className="flex justify-between py-12 gap-10">
            {" "}
            {/* Adjusted spacing and alignment */}
            <QuickActions /> {/* Giving each section half the width */}
            <ToDo /> {/* Ensuring equal width for better alignment */}
      
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-row">
          <div className="w-5/6 text-2xl font-bold mb-8">Your Services</div>
          <div className="w-1/6 ml-10">Add new Service</div></div>
          <div className="grid grid-cols-3 gap-6 overflow-x-auto">
            <VendorResult
              key="sdf"
              vendor="sfsfd"
              city={"sdsy"}
              banner={"/login-signup.jpg"}
              rating="⭐ 4.9 (154)" // customize the rating
              price="$$-$$$" // customize the price
              about={"No description available"}
            />            
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="text-2xl font-bold mb-8">Messages and Inquiries</div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoard;

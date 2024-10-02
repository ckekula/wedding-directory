import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Settings from "@/components/vendor-dashboard/dashboard-settings/Settings";
import EditProfile from "@/components/vendor-dashboard/dashboard-settings/EditProfile";

const VendorDashBoardSettings = () => {
  return (
    <div className="">
      <Header />
      <div className="bg-lightYellow min-h-screen">
        <div className="p-20">
          {/* Vendor Banner */}
          <VendorBanner businessName="John's Flower Shop" />
        </div>

        <div className="container mx-auto flex space-x-10 ">
          {/* Sidebar (Settings) */}
          <div className="w-1/4">
            <Settings />
          </div>

          {/* Edit Profile Section */}
          <div className="w-3/4  ">
            <EditProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoardSettings;

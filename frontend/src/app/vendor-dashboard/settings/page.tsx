"use client";

import React, { useState } from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Settings from "@/components/vendor-dashboard/dashboard-settings/SettingsMenu";
import EditProfile from "@/components/vendor-dashboard/dashboard-settings/EditProfile";
import Footer from "@/components/shared/Footer";
import EditGeneral from "@/components/vendor-dashboard/dashboard-settings/EditGeneral";
import EditAccount from "@/components/vendor-dashboard/dashboard-settings/EditAccount";

const VendorDashBoardSettings = () => {

  const [activeSection, setActiveSection] = useState("general");

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return <EditGeneral />;
      case "profile":
        return <EditProfile />;
      case "account":
        return <EditAccount />; // Pass the offeringId to the EditPortfolio component
      default:
        return <EditGeneral />;
    }
  };

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
            <Settings setActiveSection={setActiveSection} />
          </div>

          {/* Dynamic Right Section */}
          <div className="w-3/4  ">{renderSection()}</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default VendorDashBoardSettings;

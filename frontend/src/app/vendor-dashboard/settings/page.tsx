"use client";

import React, { useState } from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import SettingsMenu from "@/components/vendor-dashboard/dashboard-settings/SettingsMenu";
import EditProfile from "@/components/vendor-dashboard/dashboard-settings/EditProfile";
import Footer from "@/components/shared/Footer";
import EditGeneral from "@/components/vendor-dashboard/dashboard-settings/EditGeneral";
import EditAccount from "@/components/vendor-dashboard/dashboard-settings/EditAccount";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";

const VendorDashBoardSettings = () => {
  const { vendor } = useVendorAuth();
  const {
    data: vendorData} = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });
  const [activeSection, setActiveSection] = useState("general");
  const vendorInfo = vendorData?.findVendorById;

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return <EditGeneral />;
      case "profile":
        return <EditProfile />;
      case "account":
        return <EditAccount />;
      default:
        return <EditGeneral />;
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-lightYellow flex-grow">

        {/* Vendor Banner */}
        <div className="container mx-auto px-4 py-6">
          <VendorBanner vendor={vendorInfo} />
        </div>
        

        <div className="container mx-auto flex px-4 py-6 gap-6">
          {/* Sidebar */}
          <div className="w-1/4">
            <SettingsMenu setActiveSection={setActiveSection} />
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

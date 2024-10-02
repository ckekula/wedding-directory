"use client";
import Header from "@/components/shared/Headers/Header";
import EditPublicProfile from "@/components/vendor-dashboard/dahboard-services/EditPublicProfile";
import EditSocialContact from "@/components/vendor-dashboard/dahboard-services/EditSocialContact";
import EditPortfolio from "@/components/vendor-dashboard/dahboard-services/EditPortfolio";
import EditServiceSettings from "@/components/vendor-dashboard/dahboard-services/EditServiceSettings";
import ServicesMenu from "@/components/vendor-dashboard/dahboard-services/ServicesMenu";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import React, { useState } from "react";

const Services = () => {
  // Set default active section to "Public Profile"
  const [activeSection, setActiveSection] = useState("publicProfile");

  // Function to render the correct component based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "publicProfile":
        return <EditPublicProfile />;
      case "socialContact":
        return <EditSocialContact />;
      case "portfolio":
        return <EditPortfolio />;
      case "serviceSettings":
        return <EditServiceSettings />;
      default:
        return <EditPublicProfile />;
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

        <div className="container mx-auto flex space-x-10">
          {/* Sidebar (Settings) */}
          <div className="w-1/4">
            <ServicesMenu setActiveSection={setActiveSection} />
          </div>

          {/* Dynamic Right Section */}
          <div className="w-3/4">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default Services;

"use client"; // This ensures the page is client-rendered

import React, { useState, useEffect } from "react";
import Header from "@/components/shared/Headers/Header";
import EditGeneral from "@/components/vendor-dashboard/dahboard-services/EditGeneral";
import EditSocialContact from "@/components/vendor-dashboard/dahboard-services/EditSocialContact";
import EditPortfolio from "@/components/vendor-dashboard/dahboard-services/EditPortfolio";
import EditServiceSettings from "@/components/vendor-dashboard/dahboard-services/EditServiceSettings";
import ServicesMenu from "@/components/vendor-dashboard/dahboard-services/ServicesMenu";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Footer from "@/components/shared/Footer";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory

const EditService = () => {
  const router = useRouter(); // from next/navigation
  const [offeringId, setOfferingId] = useState("");

  useEffect(() => {
    // No router.isReady in next/navigation, so we handle this differently
    const currentPath = window.location.pathname; // Get current path
    const pathParts = currentPath.split("/"); // Split by "/"
    const id = pathParts[2]; // Assuming the ID is in the third segment of the URL (after /services/)

    if (id) {
      setOfferingId(id); // Set the offeringId based on URL
    }
  }, []);

  const [activeSection, setActiveSection] = useState("publicProfile");

  const renderSection = () => {
    switch (activeSection) {
      case "publicProfile":
        return <EditGeneral isServiceVisible={true} />;
      case "socialContact":
        return <EditSocialContact />;
      case "portfolio":
        return <EditPortfolio offeringId={offeringId} />; // Pass the offeringId to the EditPortfolio component
      case "serviceSettings":
        return <EditServiceSettings />;
      default:
        return <EditGeneral isServiceVisible={true} />;
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
      <Footer />
    </div>
  );
};

export default EditService;

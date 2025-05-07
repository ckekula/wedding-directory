"use client";

import React, { useState } from "react";
import Header from "@/components/shared/Headers/Header";
import EditGeneral from "@/components/vendor-dashboard/dahboard-services/edit/EditGeneral";
import EditSocialLinks from "@/components/vendor-dashboard/dahboard-services/edit/EditSocialLinks";
import EditPortfolio from "@/components/vendor-dashboard/dahboard-services/edit/EditPortfolio";
import EditServiceSettings from "@/components/vendor-dashboard/dahboard-services/edit/EditServiceSettings";
import EditPackages from "@/components/vendor-dashboard/dahboard-services/edit/EditPackages";
import ServicesMenu from "@/components/vendor-dashboard/dahboard-services/ServicesMenu";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Footer from "@/components/shared/Footer";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";

const EditService = () => {
  const { vendor } = useVendorAuth();

  const {data: vendorData} = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  const vendorInfo = vendorData?.findVendorById;
  const [activeSection, setActiveSection] = useState("publicProfile");

  const renderSection = () => {
    switch (activeSection) {
      case "publicProfile":
        return <EditGeneral/>;
      case "socialContact":
        return <EditSocialLinks />;
      case "portfolio":
        return <EditPortfolio />;
      case "serviceSettings":
        return <EditServiceSettings />;
      case "packages":
        return <EditPackages />;
      default:
        return <EditGeneral/>;
    }
  };

  return (
    <div className="">
      <Header />
      <div className="bg-lightYellow min-h-screen">

        <div className="container mx-auto px-4 py-6">
          {/* Vendor Banner */}
          <VendorBanner vendor={vendorInfo} />
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

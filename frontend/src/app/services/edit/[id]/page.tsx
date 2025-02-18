"use client";

import React, { useState } from "react";
import Header from "@/components/shared/Headers/Header";
import EditGeneral from "@/components/vendor-dashboard/dahboard-services/EditGeneral";
import EditSocialContact from "@/components/vendor-dashboard/dahboard-services/EditSocialContact";
import EditPortfolio from "@/components/vendor-dashboard/dahboard-services/EditPortfolio";
import EditServiceSettings from "@/components/vendor-dashboard/dahboard-services/EditServiceSettings";
import ServicesMenu from "@/components/vendor-dashboard/dahboard-services/ServicesMenu";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Footer from "@/components/shared/Footer";
import { useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import EditPackages from "@/components/vendor-dashboard/dahboard-services/EditPackages";


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
        return <EditGeneral isServiceVisible={true} />;
      case "socialContact":
        return <EditSocialContact />;
      case "portfolio":
        return <EditPortfolio />;
      case "serviceSettings":
        return <EditServiceSettings />;
      case "packages":
        return <EditPackages />;
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
          <VendorBanner  businessName={vendorInfo?.busname} />
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

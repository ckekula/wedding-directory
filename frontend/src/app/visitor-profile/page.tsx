"use client";
import Header from "@/components/shared/Headers/Header";

import WeddingDetails from "@/components/visitor-profile/WeddingDetails";
import AccountDetails from "@/components/visitor-profile/AccountDetails";
import ProfileMenu from "@/components/visitor-profile/ProfileMenu";
import React, { useState } from "react";

const Page = () => {
  // Set default active section to "Public Profile"
  const [activeSection, setActiveSection] = useState("weddingDetails");

  // Function to render the correct component based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "weddingDetails":
        return <WeddingDetails />;
      case "accountDetails":
        return <AccountDetails />;

      default:
        return <WeddingDetails />;
    }
  };

  return (
    <div className="">
      <Header />
      <div className="bg-lightYellow min-h-screen">
        <div className="container mx-auto flex space-x-10 p-20 gap-16">
          {/* Sidebar (Settings) */}
          <div className="w-1/4">
            <ProfileMenu setActiveSection={setActiveSection} />
          </div>

          {/* Dynamic Right Section */}
          <div className="w-3/4">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;

/* import { Input } from "@/components/ui/input";

//components
import Header from "@/components/shared/Headers/Header";
import Footer from "@/components/shared/Footer";
import ProfileSetting from "@/components/ProfileSetting";

const page = () => {
  return (
    <div className="bg-lightYellow">
      <Header />

      <ProfileSetting />

      <Footer />
    </div>
  );
};

export default page; */

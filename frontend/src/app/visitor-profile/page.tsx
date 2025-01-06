"use client";

import Header from "@/components/shared/Headers/Header";
import WeddingDetails from "@/components/visitor-profile/WeddingDetails";
import AccountDetails from "@/components/visitor-profile/AccountDetails";
import ProfileMenu from "@/components/visitor-profile/ProfileMenu";
import React, { useState } from "react";
import Footer from "@/components/shared/Footer";
import WeddingCoupleCard from '@/components/visitor-dashboard/WeddingCoupleCard';
import { useAuth } from '@/contexts/VisitorAuthContext';
import { useQuery } from '@apollo/client';
import { GET_VISITOR_BY_ID } from '@/graphql/queries';
import { StaticImageData } from 'next/image';

const VisitorProfile = () => {
  const { visitor } = useAuth();
  const [profilePic, setProfilePic] = useState<string | StaticImageData>('/images/visitorProfilePic.webp');

  const { data } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
    onCompleted: (data) => {
      if (data?.findVisitorById?.profile_pic_url) {
        setProfilePic(data.findVisitorById.profile_pic_url);
      }
    },
  });
  const visitorData = data?.findVisitorById;

  const [activeSection, setActiveSection] = useState("weddingDetails");

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-lightYellow">
        {/* Main content wrapper with proper spacing */}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Wedding Couple Card Section */}
          <div className="mb-6 sm:mb-8">
            <WeddingCoupleCard
              profilePic={profilePic}
              setProfilePic={setProfilePic}
              weddingDate={visitorData?.wed_date}
              brideName={visitorData?.partner_fname}
              groomName={visitorData?.visitor_fname}
            />
          </div>

          {/* Profile Content Section */}
          <div className="flex flex-col gap-8 md:flex-row md:space-x-8 space-y-6 md:space-y-0">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 flex-shrink-0 ">
              <ProfileMenu setActiveSection={setActiveSection} />
            </aside>

            {/* Main Content Area */}
            <div className="w-full md:w-3/4 pb-8 md:pb-0">
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VisitorProfile;
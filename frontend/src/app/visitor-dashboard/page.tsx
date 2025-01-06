// visitor-dashboard.tsx
"use client";

import React, { Fragment, useState } from "react";
import Header from "@/components/shared/Headers/Header";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import WeddingCoupleCard from "@/components/visitor-dashboard/WeddingCoupleCard";
import WeddingPlanningGuide from "@/components/visitor-dashboard/WeddingPlanningGuide";
import { StaticImageData } from "next/image";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";
import Footer from "@/components/shared/Footer";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import { Accordion } from "@/components/ui/accordion";
import AccordionItemBlock from "@/components/visitor-dashboard/AccordianItemsBlock";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
import BottomNavigationBar from '@/components/visitor-dashboard/BottomNavigationBar';

const VisitorDashboard = () => {
  const { visitor } = useAuth();
  const [profilePic, setProfilePic] = useState<string | StaticImageData>("/images/visitorProfilePic.webp");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
    onCompleted: (data) => {
      if (data?.findVisitorById?.profile_pic_url) {
        setProfilePic(data.findVisitorById.profile_pic_url);
      }
    },
  });

  if (loading) return <LoaderHelix />;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  const visitorData = data?.findVisitorById;

  return (
    <Fragment>
      <div className="container mx-auto px-4">
        <Header />
      </div>



      <div className="bg-lightYellow min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Sidebar - hidden on mobile */}
            <div
              className={`
                hidden md:block transition-all duration-300 ease-in-out
                ${isSidebarCollapsed ? 'md:col-span-1' : 'md:col-span-2 lg:col-span-2'}
                pt-10
              `}
            >
              <div className="sticky top-4 pb-4">
                <LeftSideBar
                  visitorId={visitor?.id || null}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
              </div>
            </div>

            {/* Center Column */}
            <div
              className={`
                col-span-12 transition-all duration-300 ease-in-out
                ${isSidebarCollapsed
                ? 'md:col-span-11'
                : 'md:col-span-10 lg:col-span-10'
              }
                pt-10
              `}
            >
              <div className="w-full pb-8">
                <WeddingCoupleCard
                  brideName={visitorData?.partner_fname}
                  groomName={visitorData?.visitor_fname}
                  weddingDate={visitorData?.wed_date}
                  profilePic={profilePic}
                  setProfilePic={setProfilePic}
                />
              </div>

              <Accordion
                type="multiple"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              >
                <AccordionItemBlock
                  title="Vendors"
                  description="Get in touch with photographers, DJs, florists, and more."
                />
                <AccordionItemBlock
                  title="Venues"
                  description="Find your kind of place for the celebration to go down."
                />
                <AccordionItemBlock
                  title="Guest List"
                  description="Manage your guest list for the big day."
                />
                <AccordionItemBlock
                  title="Announcements"
                  description="Start spreading the word with save the dates."
                />
              </Accordion>

              <div className="pt-5 pb-10">
                <WeddingPlanningGuide />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigationBar />
      <Footer />
    </Fragment>
  );
};

export default VisitorDashboard;

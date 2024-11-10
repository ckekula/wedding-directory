"use client";

import React, { Fragment, useState } from "react";
import Header from "@/components/shared/Headers/Header";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import WeddingCoupleCard from '@/components/visitor-dashboard/WeddingCoupleCard';
import WeddingPlanningGuide from "@/components/visitor-dashboard/WeddingPlanningGuide";
import { StaticImageData } from "next/image";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";
import Footer from "@/components/shared/Footer";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import { Accordion } from '@/components/ui/accordion';
import AccordionItemBlock from "@/components/visitor-dashboard/AccordianItemsBlock";

const VisitorDashboard = () => {
  const { visitor } = useAuth();
  const [profilePic, setProfilePic] = useState<string | StaticImageData>('/images/visitorProfilePic.webp');

  // Fetch visitor data including profile_pic_url
  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
    onCompleted: (data) => {
      if (data?.findVisitorById?.profile_pic_url) {
        setProfilePic(data.findVisitorById.profile_pic_url); // Set the uploaded profile picture URL
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
      <div className="bg-lightYellow py-10 px-4 sm:px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="w-full pb-8">
            <WeddingCoupleCard
              brideName={visitorData?.partner_fname}
              groomName={visitorData?.visitor_fname}
              weddingDate={visitorData?.wed_date}
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />
          </div>
            <Accordion type="multiple" className="grid grid-cols-2 gap-8">
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
      <Footer />
    </Fragment>
  );
};

export default VisitorDashboard;

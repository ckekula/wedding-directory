"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import Header from "@/components/shared/Headers/Header";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { Accordion } from "@/components/ui/accordion";
import VisitorInfo from "@/components/visitor-dashboard/VisitorInfo";
import ProfilePicture from "@/components/visitor-dashboard/ProfilePicture";
import WeddingPlanningGuide from "@/components/visitor-dashboard/WeddingPlanningGuide";
import AccordionItemBlock from "@/components/visitor-dashboard/AccordianItemsBlock";
import profilePicPlaceholder from "../../../public/dashboard_profile_pic_placeholder.jpg"
import { StaticImageData } from "next/image";

// Placeholder for profile picture
//const profilePicPlaceholder = "/path/to/default/profilePic.png";

// GraphQL query to get visitor details by ID
const GET_VISITOR_BY_ID = gql`
  query GetVisitorById($id: String!) {
    findVisitorById(id: $id) {
      id
      visitor_fname
      partner_fname
      wed_venue
      wed_date
      profile_pic_url
    }
  }
`;

const VisitorDashboard = () => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);
  const { visitor } = useAuth();
  const [profilePic, setProfilePic] = useState<string | StaticImageData>(profilePicPlaceholder);

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

  if (loading) return <p>Loading visitor information...</p>;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  const visitorData = data?.findVisitorById;

  return (
    <Fragment>
      <div className="container">
        <Header />
      </div>
      <div className="bg-lightYellow flex">
        <div className="flex w-1/5 h-[calc(100vh-100px)] items-center">
          <LeftSideBar
            isCollapsed={isSideBarCollapsed}
            setIsCollapsed={setIsSideBarCollapsed}
          />
        </div>
        <div
          className={`transition-all duration-300 py-10 ${
            isSideBarCollapsed ? "w-[calc(100%-55px)]" : "w-[calc(100%-16rem)]"
          }`}
        >
          <div className="mr-52 w-container">
            <div className="flex justify-between p-10">
              <ProfilePicture
                profilePic={profilePic}
                setProfilePic={setProfilePic}
              />
              <VisitorInfo
                visitor_fname={visitorData?.visitor_fname}
                partner_fname={visitorData?.partner_fname}
                wed_date={visitorData?.wed_date}
                wed_venue={visitorData?.wed_venue}
              />
            </div>

            <Accordion type="multiple" className="grid grid-cols-2 gap-8 p-8">
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
            <div className="pt-5 pb-10 px-10">
              <WeddingPlanningGuide />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VisitorDashboard;

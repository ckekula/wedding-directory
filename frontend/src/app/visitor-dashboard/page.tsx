"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import Header from "@/components/shared/Headers/Header";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
import Image from "next/image";
import profilePic from "../../assets/images/dashboardProfilePic.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { useQuery } from "@apollo/client";
import { GET_VISITOR_BY_ID } from "@/api/graphql/queries";

const VisitorDashboard = () => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);
  const { visitor, accessToken, login, isAuthenticated } = useAuth(); // Added login method for token context management
  const [tokenChecked, setTokenChecked] = useState(false);

  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id, // Skip query if no visitor ID is available
  });

  if (loading) {
    return <p>Loading visitor information...</p>;
  }
  if (error) {
    return <p>Error loading profile information: {error.message}</p>;
  }

  const visitorData = data?.findVisitorById;

  return (
    <Fragment>
      <div>
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
              isSideBarCollapsed
                ? "w-[calc(100%-55px)]"
                : "w-[calc(100%-16rem)]"
            }`}
          >
            <div className=" mr-52">
              <div className="flex justify-between">
                <div className="flex w-full items-center">
                  <div className="rounded-xl overflow-hidden transform -rotate-12 shadow-lg">
                    <Image
                      src={profilePic}
                      alt="dashboard profile picture"
                      className="w-[175px] h-[175px]"
                    />
                  </div>
                  <div className="font-merriweather">
                    <div className="flex flex-col text-center">
                      <span className="block text-5xl font-bold">
                        {visitorData?.visitor_fname || "Visitor"}
                      </span>
                      <span className="block text-4xl font-bold">&</span>
                      <span className="block text-5xl font-bold ml-20">
                        {visitorData?.partner_fname || "Partner"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center whitespace-nowrap justify-center">
                  <p className="font-title text-4xl font-semibold">
                    Plan your wedding
                  </p>
                  <p className="font-body text-lg">All in one place</p>
                  <Link href="budgeter">
                    <p className="font-body text-sm mt-4">Set Budget</p>
                  </Link>
                </div>
              </div>
              <div className="flex mt-4 justify-center gap-8 font-body">
                <div>
                  <span>{visitorData?.wed_date || "Add Date"}</span>
                </div>
                <div>
                  <span>{visitorData?.wed_venue || "Add Venue"}</span>
                </div>
                <div>
                  <span>No of Guests</span>
                </div>
              </div>
              <hr className="w-3/5 h-1 mx-auto my-4 bg-[rgba(0,0,0,0.25)] border-0 rounded md:my-6"></hr>

              {/* Single Accordion container for all sections */}
              <Accordion type="multiple" className="">
                <div className="grid grid-cols-2 gap-8">
                  {/* Vendors Block */}
                  <AccordionItem
                    value="vendors"
                    className=" bg-white shadow-lg px-7 pb-7 rounded-xl "
                  >
                    <AccordionTrigger className="text-left mb-1">
                      <div className="flex flex-col ">
                        <h3 className="font-title text-3xl text-left">
                          Vendors
                        </h3>
                        <p className="text-sm font-body">
                          Get in touch with photographers, DJs, florists, and
                          more.
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-body"></AccordionContent>
                  </AccordionItem>

                  {/* Venue Block */}
                  <AccordionItem
                    value="venues"
                    className=" bg-white shadow-lg px-7 pb-7 rounded-xl "
                  >
                    <AccordionTrigger className="text-left mb-1">
                      <div className="flex flex-col ">
                        <h3 className="font-title text-3xl ">Venues</h3>
                        <p className="text-sm font-body ">
                          Find your kind of place for the celebration to go
                          down.
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-body"></AccordionContent>
                  </AccordionItem>

                  {/* Guest List Block */}
                  <AccordionItem
                    value="guest-list"
                    className=" bg-white shadow-lg px-7 pb-7 rounded-xl "
                  >
                    <AccordionTrigger className="text-left mb-1">
                      <div className="flex flex-col">
                        <h3 className="font-title text-3xl ">Guest List</h3>
                        <p className="text-sm font-body">
                          Find your kind of place for the celebration to go
                          down.
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-body"></AccordionContent>
                  </AccordionItem>
                  {/* Announcements Block */}
                  <AccordionItem
                    value="announcements"
                    className=" bg-white shadow-lg px-7 pb-7 rounded-xl "
                  >
                    <AccordionTrigger className="text-left mb-1">
                      <div className="flex flex-col">
                        <h3 className="font-title text-3xl  ">Announcements</h3>
                        <p className="text-sm font-body">
                          Start spreading the word with save the dates
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-body"></AccordionContent>
                  </AccordionItem>
                </div>
              </Accordion>

              {/* Wedding Planning Guide Block */}
              <div className="flex  mt-10">
                <div className="bg-white shadow-lg p-6 rounded-xl text-center w-full">
                  <h3 className="font-title text-4xl font-semibold">
                    Have no idea about how to plan your wedding?
                  </h3>
                  <p className=" text-l font-body my-2">
                    We are here to help you for every little step of yours!
                  </p>
                  <Button variant="signup">Say I Do Guidance</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VisitorDashboard;

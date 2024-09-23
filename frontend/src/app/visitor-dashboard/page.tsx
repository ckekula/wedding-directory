"use client";
import React, { Fragment } from "react";
import Header from "@/components/shared/Headers/Header";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
import Image from "next/image";

const VisitorDashboard = () => {
  return (
    <Fragment>
      <div>
        {/* Header */}
        <div className="container">
          <Header />
        </div>

        <div className="bg-lightYellow flex">
          {/* Sidebar */}
          <div className="flex w-1/5 h-[calc(100vh-100px)] items-center">
            <LeftSideBar />
          </div>

          {/* Main Content */}
          <div className="w-4/5 px-10 py-6">
            {/* Profile and Title Section */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {/* Replace with your profile image */}
                  <Image
                    src="/path/to/profile.jpg" // Replace with actual image path
                    alt="Profile Image"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-4xl font-bold">John & Jane</h2>
                </div>
              </div>

              <div className="text-right">
                <h3 className="text-2xl font-bold">Plan your wedding</h3>
                <p>All in one place</p>
                <button className="bg-primary text-white px-4 py-2 rounded-full mt-2">
                  Set Budget
                </button>
              </div>
            </div>

            {/* Date, Venue, and Guests Section */}
            <div className="flex justify-between mb-8">
              <button className="border border-gray-400 px-6 py-4 rounded-lg">
                Add Date
              </button>
              <button className="border border-gray-400 px-6 py-4 rounded-lg">
                Add Venue
              </button>
              <button className="border border-gray-400 px-6 py-4 rounded-lg">
                No. of Guests
              </button>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-2 gap-8">
              {/* Vendors and Venues */}
              <div className="border p-6 rounded-lg shadow-lg bg-white">
                <h4 className="text-xl font-bold">Vendors</h4>
                <p>Get in touch with photographers, DJs, florists, and more.</p>
              </div>
              <div className="border p-6 rounded-lg shadow-lg bg-white">
                <h4 className="text-xl font-bold">Venues</h4>
                <p>Find your kind of place for the celebration to go down.</p>
              </div>

              {/* Guest List and Announcements */}
              <div className="border p-6 rounded-lg shadow-lg bg-white">
                <h4 className="text-xl font-bold">Guests List</h4>
                <p>Start spreading the word with save-the-dates.</p>
              </div>
              <div className="border p-6 rounded-lg shadow-lg bg-white">
                <h4 className="text-xl font-bold">Announcements</h4>
                <p>Start spreading the word with announcements.</p>
              </div>
            </div>

            {/* Wedding Guide Section */}
            <div className="mt-10 p-8 bg-white rounded-lg shadow-lg text-center">
              <h4 className="text-2xl font-bold">
                Have no idea about how to plan your wedding?
              </h4>
              <p className="mt-2">
                We are here to help you for every little step of yours!
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-full mt-4">
                Say I Do Guidance
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VisitorDashboard;

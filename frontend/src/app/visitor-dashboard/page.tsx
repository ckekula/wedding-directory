"use client";
import React, { Fragment } from "react";
import Header from "@/components/shared/Headers/Header";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
const VisitorDashboard = () => {
  return (
    <Fragment>
      <div>
        <div className="container">
          <Header />
        </div>
        <div className="bg-lightYellow flex">
          <div className="flex w-1/5 h-[calc(100vh-100px)]  items-center">
            <LeftSideBar />
            
          </div>
          <div>John and Jane</div>
        <div>Plan your wedding.</div>
        <div>Add Date</div>
        <div>Add venue</div>
        <div>Add number of guests</div>
        <div>Venodr block</div>
        <div>Venue block</div>
        <div>guest list block</div>
        <div>anouncement block</div>
        <div>edding planning guide block</div>
        </div>
        
      </div>
    </Fragment>
  );
};

export default VisitorDashboard;

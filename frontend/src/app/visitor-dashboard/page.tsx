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
        {/* <div className="bg-lightYellow w-full lg-w-1/5 h-[calc(100vh-100px)] ">
      <LeftSideBar />
      </div> */}
        <div className="bg-lightYellow ">
          <div className="flex w-1/5 h-[calc(100vh-100px)]  items-center">
            <LeftSideBar />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VisitorDashboard;

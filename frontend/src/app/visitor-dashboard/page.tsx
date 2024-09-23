"use client"
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
      <div className="bg-lightYellow w-full lg-w-1/5 h-screen ">
      <LeftSideBar />
        </div>
    </div>
    </Fragment>
  );
};

export default VisitorDashboard;

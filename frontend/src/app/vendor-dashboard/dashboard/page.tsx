"use client";

import React, { Fragment } from "react";

//components
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
const page = () => {
  return (
    <Fragment>
      <div>
        <Header />
        <div className="bg-lightYellow min-h-screen">
          <div className="p-20">
            <h1 className="font-title text-[32px] text-black">Welcome</h1>
            {/* Vendor Banner */}
            <VendorBanner businessName="John's Flower Shop" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default page;

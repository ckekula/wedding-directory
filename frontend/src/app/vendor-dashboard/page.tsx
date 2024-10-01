import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";

const page = () => {
  return (
    <div className="">
      <Header />
      <div className="bg-lightYellow h-screen">
        <div className="p-20">
          <VendorBanner businessName="John's Flower Shop" />
        </div>
      </div>
    </div>
  );
};

export default page;

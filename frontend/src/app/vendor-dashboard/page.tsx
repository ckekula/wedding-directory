import React, { Fragment } from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";

const EditProfilePage = () => {
  return (
    <Fragment>
      <Header />
      <div className="bg-lightYellow">
        <div className="container ">
          <h2 className="font-title font-bold text-[36px] p-8 text-center">
            Welcome
          </h2>
          <VendorBanner businessName="John's Flower Shop" />
          <div className="flex justify-center gap-10 my-8 font-body ">
            <p>Category</p>
            <p>Member since</p>
            <p>Rating</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfilePage;

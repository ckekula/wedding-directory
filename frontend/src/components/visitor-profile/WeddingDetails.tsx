"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WeddingDetailsData {
  firstName: string;
  lastName: string;
  partnerFirstName: string;
  partnerLastName: string;
  engagementDate: string;
  weddingDate: string;
  weddingVenue: string;
}

const WeddingDetails: React.FC = () => {
  // Form state to hold the wedding details
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetailsData>({
    firstName: "John",
    lastName: "Smith",
    partnerFirstName: "Jane",
    partnerLastName: "Holmes",
    engagementDate: "2024-09-23",
    weddingDate: "2025-12-09",
    weddingVenue: "Sunset Beach Resort",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeddingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Wedding details saved successfully!");
    console.log(weddingDetails); // This will log the updated wedding details in the browser console for now
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="font-title text-[30px]">Wedding Details</h2>
        <hr className="w-[210px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="font-body text-[16px]">First Name</label>
              <Input
                name="firstName"
                value={weddingDetails.firstName}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 "
              />
            </div>
            <div>
              <label className="font-body text-[16px]">Last Name</label>
              <Input
                name="lastName"
                value={weddingDetails.lastName}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 "
              />
            </div>
            <div>
              <label className="font-body text-[16px]">
                Partner’s First Name
              </label>
              <Input
                name="partnerFirstName"
                value={weddingDetails.partnerFirstName}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 "
              />
            </div>
            <div>
              <label className="font-body text-[16px]">
                Partner’s Last Name
              </label>
              <Input
                name="partnerLastName"
                value={weddingDetails.partnerLastName}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 "
              />
            </div>
            <div>
              <label className="font-body text-[16px]">Engagement Date</label>
              <Input
                type="date"
                name="engagementDate"
                value={weddingDetails.engagementDate}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 "
              />
            </div>
            <div>
              <label className="font-body text-[16px]">Wedding Date</label>
              <Input
                type="date"
                name="weddingDate"
                value={weddingDetails.weddingDate}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 "
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="font-body text-[16px]">Wedding Venue</label>
            <Input
              name="weddingVenue"
              value={weddingDetails.weddingVenue}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 "
            />
          </div>
        </form>
      </div>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" className="m-3 w-full">
          Save Wedding Details
        </Button>
      </div>
    </Fragment>
  );
};

export default WeddingDetails;

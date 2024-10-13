"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VISITOR_BY_ID } from "@/api/graphql/queries";
import { WeddingDetailsData } from "@/types/visitorProfileTypes";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { UPDATE_VISITOR } from "@/api/graphql/mutations";


const WeddingDetails: React.FC = () => {

  const { visitor } = useAuth();

  // Fetch visitor data from the server using the visitor ID
  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id, // Skip query if visitor ID is not available
  });

  const visitorData = data?.findVisitorById;

  // Form state to hold the wedding details
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetailsData>({
    firstName: visitorData?.visitor_fname || "Your first name",
    lastName: visitorData?.visitor_lname || "Your last name",
    partnerFirstName: visitorData?.partner_fname || "Partners first name",
    partnerLastName: visitorData?.partner_lname || "Partners last name",
    engagementDate: visitorData?.engaged_date || "Your engagement date",
    weddingDate: visitorData?.wed_date || "Your wedding date",
    weddingVenue: visitorData?.wed_venue || "Your wedding venue",
  });

    // Mutation for updating visitor details
    const [updateVisitor] = useMutation(UPDATE_VISITOR, {
      onCompleted: () => {
        // Optionally handle success (e.g., show a message, redirect, etc.)
        console.log("Visitor updated successfully!");
      },
      onError: (error) => {
        // Handle error (e.g., show an error message)
        console.error("Error updating visitor:", error);
      },
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

    updateVisitor({
      variables: {
        id: visitor?.id,
        input: {
          visitor_fname: weddingDetails.firstName,
          visitor_lname: weddingDetails.lastName,
          partner_fname: weddingDetails.partnerFirstName,
          partner_lname: weddingDetails.partnerLastName,
          engaged_date: weddingDetails.engagementDate,
          wed_date: weddingDetails.weddingDate,
          wed_venue: weddingDetails.weddingVenue
        }
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading visitor details: {error.message}</p>;

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
          <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
            <Button variant="signup" className="m-3 w-full">
              Save Wedding Details
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default WeddingDetails;

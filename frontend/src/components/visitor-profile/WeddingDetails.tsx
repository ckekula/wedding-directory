"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";
import { WeddingDetailsData } from "@/types/visitorProfileTypes";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { UPDATE_VISITOR, SET_WEDDING_DATE } from "@/graphql/mutations";
import toast from "react-hot-toast";

const WeddingDetails: React.FC = () => {
  const { visitor } = useAuth();

  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

    const [setWeddingDate] = useMutation(SET_WEDDING_DATE, {
      onCompleted: () => {
        toast.success("Wedding date updated and checklist generated!");
      },
      onError: (error) => {
        console.error("Error setting wedding date:", error);
        toast.error("Failed to update wedding date");
      },
    });

  const visitorData = data?.findVisitorById;

  const [weddingDetails, setWeddingDetails] = useState<WeddingDetailsData>({
    firstName: visitorData?.visitor_fname || "Your first name",
    lastName: visitorData?.visitor_lname || "Your last name",
    partnerFirstName: visitorData?.partner_fname || "Partners first name",
    partnerLastName: visitorData?.partner_lname || "Partners last name",
    engagementDate: visitorData?.engaged_date || "Your engagement date",
    weddingDate: visitorData?.wed_date || "Your wedding date",
    weddingVenue: visitorData?.wed_venue || "Your wedding venue",
  });

  const [updateVisitor] = useMutation(UPDATE_VISITOR, {
    onCompleted: () => {
      console.log("Visitor updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating visitor:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeddingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (
      weddingDetails.weddingDate &&
      weddingDetails.weddingDate !== "Your wedding date"
    ) {
      await setWeddingDate({
        variables: {
          visitorId: visitor?.id,
          weddingDate: new Date(weddingDetails.weddingDate).toISOString(),
        },
      });
    }

    toast.success("Wedding details saved successfully!");


  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error loading visitor details: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg max-w-4xl mx-auto">
        <h2 className="font-title text-2xl sm:text-[30px] text-text">Wedding Details</h2>
        <div className="w-full h-px my-4 bg-gray-300"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid container with responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {/* Your Details Section */}
            <div className="space-y-4">
              <div>
                <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={weddingDetails.firstName}
                  onChange={handleInputChange}
                  className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>
              <div>
                <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={weddingDetails.lastName}
                  onChange={handleInputChange}
                  className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>
            </div>

            {/* Partner's Details Section */}
            <div className="space-y-4">
              <div>
                <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
                  Partner&apos;s First Name
                </label>
                <Input
                  name="partnerFirstName"
                  value={weddingDetails.partnerFirstName}
                  onChange={handleInputChange}
                  className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>
              <div>
                <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
                  Partner&apos;s Last Name
                </label>
                <Input
                  name="partnerLastName"
                  value={weddingDetails.partnerLastName}
                  onChange={handleInputChange}
                  className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>
            </div>

            {/* Date Section */}
            <div>
              <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
                Engagement Date
              </label>
              <Input
                type="date"
                name="engagementDate"
                value={weddingDetails.engagementDate}
                onChange={handleInputChange}
                className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
                Wedding Date
              </label>
              <Input
                type="date"
                name="weddingDate"
                value={weddingDetails.weddingDate}
                onChange={handleInputChange}
                className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
              />
            </div>
          </div>

          {/* Venue Section - Full Width */}
          <div>
            <label className="font-body text-sm sm:text-base text-gray-700 mb-1 block">
              Wedding Venue
            </label>
            <Input
              name="weddingVenue"
              value={weddingDetails.weddingVenue}
              onChange={handleInputChange}
              className="font-body rounded-lg border-gray-400 focus:border-gray-600 focus:ring-gray-600"
            />
          </div>

          {/* Save Button Container */}
          <div className="flex justify-center mt-8">
            <Button
              variant="signup"
              className="w-full sm:w-auto px-8 py-2.5 bg-orange hover:bg-primary text-white font-medium rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
              type="submit"
            >
              Save Wedding Details
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default WeddingDetails;
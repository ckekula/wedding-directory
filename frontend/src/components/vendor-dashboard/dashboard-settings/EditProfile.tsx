"use client";

import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/types/vendorTypes";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import { UPDATE_VENDOR } from "@/graphql/mutations";
import toast from "react-hot-toast";

const EditProfile: React.FC = () => {
  const { vendor } = useVendorAuth();
  const { data, loading, error } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  const vendorData = data?.findVendorById;

  const [profile, setProfile] = useState<ProfileData>({
    firstName: vendorData?.fname || "Your first name",
    lastName: vendorData?.lname || "Your last name",
    phone: vendorData?.phone || "Your phone number",
  });

  const [updateVendor] = useMutation(UPDATE_VENDOR, {
    onCompleted: () => {
      toast.success("Updated Successfully!");
    },
    onError: (error) => {
      toast.error("Error updating");
      console.error("Error updating vendor:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor?.id) return;

    updateVendor({
      variables: {
        id: vendor.id,
        input: {
          fname: profile.firstName,
          lname: profile.lastName,
          phone: profile.phone,
        },
      },
    });
  };

  if (loading) return <p>Loading vendor information...</p>;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px] ">Profile</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px] ">First Name</label>
            <Input
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Last Name</label>
            <Input
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Phone Number</label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <Button
            variant="signup"
            className="m-3 w-full"
          >
            Save Profile Information
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditProfile;

"use client";

import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/types/vendorTypes";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import CityInput from "@/components/vendor-signup/CityInput";
import { UPDATE_VENDOR } from "@/graphql/mutations";
import LocationInput from "@/components/vendor-signup/LocationInput";

const EditAccount: React.FC = () => {
  const { vendor } = useVendorAuth();
  const { data, loading, error } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  const vendorData = data?.findVendorById;

  const [profile, setProfile] = useState<ProfileData>({
    firstName: vendorData?.fname || "Your first name",
    lastName: vendorData?.lname || "Your last name",
    businessName: vendorData?.busname || "Your business name",
    phone: vendorData?.phone || "Your phone number",
    city: vendorData?.city || "",
    location: vendorData?.location || "",
  });

  const [updateVendor] = useMutation(UPDATE_VENDOR, {
    onCompleted: () => {
      console.log("Vendor updated successfully!");
    },
    onError: (error) => {
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

  const handleCityChange = (city: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      city,
    }));
  };

  const handleLocationChange = (location: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      location,
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
          city: profile.city,
          location: profile.location,
          busname: profile.businessName,
        },
      },
    });
  };

  if (loading) return <p>Loading vendor information...</p>;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px] ">Vendor Profile</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px] ">Business Name</label>
            <Input
              name="businessName"
              value={profile.businessName}
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
          <div>
            <label className="font-body text-[16px] mt- mb-3 ">City</label>
            <div className="font-body rounded-md mt-2 mb-3">
              <CityInput placeholder={profile.city} onCityChange={handleCityChange} />
            </div>
          </div>
          <div>
            <label className="font-body text-[16px] mt- mb-3 ">Location</label>
            <div className="font-body rounded-md mt-2 mb-3">
              <LocationInput placeholder={profile.location} onLocationChange={handleLocationChange} />
            </div>
          </div>
          <Button
            variant="signup"
            className="m-3 w-full"
            onClick={handleSubmit}
          >
            Save Profile Information
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditAccount;

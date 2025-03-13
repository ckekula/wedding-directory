"use client";

import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GeneralData } from "@/types/vendorTypes";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import CityInput from "@/components/vendor-signup/CityInput";
import { UPDATE_VENDOR } from "@/graphql/mutations";
import LocationInput from "@/components/vendor-signup/LocationInput";

const EditGeneral: React.FC = () => {
  const { vendor } = useVendorAuth();
  const { data, loading, error } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  const vendorData = data?.findVendorById;

  const [general, setGeneral] = useState<GeneralData>({
    businessName: vendorData?.busname || "Your business name",
    city: vendorData?.city || "",
    location: vendorData?.location || "",
    about: vendorData?.about || "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneral((prevGeneral) => ({
      ...prevGeneral,
      [name]: value,
    }));
  };

  const handleCityChange = (city: string) => {
    setGeneral((prevGeneral) => ({
      ...prevGeneral,
      city,
    }));
  };

  const handleLocationChange = (location: string) => {
    setGeneral((prevGeneral) => ({
      ...prevGeneral,
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
          busname: general.businessName,
          city: general.city,
          location: general.location,
          about: general.about
        },
      },
    });
  };

  if (loading) return <p>Loading vendor information...</p>;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px] ">General</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px] ">Business Name</label>
            <Input
              name="businessName"
              value={general.businessName}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">About</label>
            <Input
              name="about"
              value={general.about}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] mt- mb-3 ">City</label>
            <div className="font-body rounded-md mt-2 mb-3">
              <CityInput placeholder={general.city} onCityChange={handleCityChange} />
            </div>
          </div>
          <div>
            <label className="font-body text-[16px] mt- mb-3 ">Location</label>
            <div className="font-body rounded-md mt-2 mb-3">
              <LocationInput placeholder={general.location} onLocationChange={handleLocationChange} />
            </div>
          </div>
          <Button
            variant="signup"
            className="m-3 w-full"
          >
            Save General Information
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditGeneral;

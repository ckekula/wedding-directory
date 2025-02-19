"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessCategory from "@/components/vendor-signup/CategoryInput";
import { Switch } from "@/components/ui/switch";
import { EditProfileProps, ProfileData } from "@/types/serviceTypes";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_SERVICE_BY_ID } from "@/graphql/queries";
import { useParams } from "next/navigation";
import { UPDATE_SERVICE_PROFILE } from "@/graphql/mutations";
import toast from "react-hot-toast";

const EditGeneral: React.FC<EditProfileProps> = ({isServiceVisible}) => {

  const params = useParams();
  const { id } = params;
  const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

  const serviceData = data?.findOfferingById;

  // Form state
  const [profile, setProfile] = useState<ProfileData>({
    category: "",
    businessPhone: "",
    businessEmail: "",
    description: "",
  });

  // Update state with fetched data
  useEffect(() => {
    if (serviceData) {
      setProfile({
        category: serviceData.category || "",
        businessPhone: serviceData.bus_phone || "",
        businessEmail: serviceData.bus_email || "",
        description: serviceData.description || "",
      });
    }
  }, [serviceData]);

  const [updateVendor] = useMutation(UPDATE_SERVICE_PROFILE, {
    onCompleted: () => {
      toast.success("Updated Successfully!");
    },
    onError: (error) => {
      toast.error("Error updating");
      console.error("Error updating vendor:", error);
    },
  });

  const [serviceVisibility, setServiceVisibility] = useState(isServiceVisible);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle category change from the dropdown
  const handleCategoryChange = (category: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      businessCategory: category,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateVendor({
        variables: {
          id,
          input: {
            category: profile.category,
            bus_phone: profile.businessPhone,
            bus_email: profile.businessEmail,
            description: profile.description,
          },
        },
      });
      toast.success("Profile saved successfully!");
    } catch (err) {
      toast.error("Profile update failed!");
      console.error("Failed to update profile:", err);
    }
  };

  // Handle service visibility toggle
  const handleVisibilityToggle = () => {
    setServiceVisibility(!serviceVisibility);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px]">General</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
        
        {/* Service Visibility Toggle */}
        <div className="flex items-center mb-6">
          <label className="font-body text-[16px] mr-4">Service Visibility</label>
          <Switch checked={serviceVisibility} onCheckedChange={handleVisibilityToggle} />
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px]">Business Category</label>
            {/* Use BusinessCategory component */}
            <div className="font-body rounded-md mt-2 mb-3">
              <BusinessCategory onCategoryChange={handleCategoryChange} />
            </div>
          </div>
          <div>
            <label className="font-body text-[16px]">Business Phone</label>
            <Input
              name="businessPhone"
              value={profile.businessPhone || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Business Email</label>
            <Input
              name="businessEmail"
              value={profile.businessEmail || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Description</label>
            <textarea
              name="description"
              value={profile.description || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3 w-full h-32 p-2"
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" onClick={handleSubmit} className="m-3 w-full">
          Save General information
        </Button>
      </div>
    </Fragment>
  );
};

export default EditGeneral;

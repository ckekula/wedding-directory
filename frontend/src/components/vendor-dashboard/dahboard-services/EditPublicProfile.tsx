"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessCategory from "@/components/vendor-signup/CategoryInput";
import { Switch } from "@/components/ui/switch";

interface PublicProfileData {
  businessCategory: string;
  businessPhone: string;
  businessEmail: string;
  tagLine: string;
  experience: string;
  expensiveness: string;
  businessDescription: string;
}

interface EditPublicProfileProps {
  isServiceVisible: boolean; // Prop for service visibility
}

const EditPublicProfile: React.FC<EditPublicProfileProps> = ({
  isServiceVisible,
}) => {
  // Form state with demo data
  const [publicProfile, setPublicProfile] = useState<PublicProfileData>({
    businessCategory: "Florist",
    businessPhone: "+91-34-7890-1234",
    businessEmail: "johnflorists@email.com",
    tagLine: "we sell flowers",
    experience: "5 years",
    expensiveness: "$$$",
    businessDescription: "we don't have a description yet",
  });

  const [serviceVisibility, setServiceVisibility] = useState(isServiceVisible);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPublicProfile((prevPublicProfile) => ({
      ...prevPublicProfile,
      [name]: value,
    }));
  };

  // Handle category change from the dropdown
  const handleCategoryChange = (category: string) => {
    setPublicProfile((prevPublicProfile) => ({
      ...prevPublicProfile,
      businessCategory: category,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile saved successfully!");
    console.log(publicProfile); // This will log the updated profile in the browser console for now
  };

  // Handle service visibility toggle
  const handleVisibilityToggle = () => {
    setServiceVisibility(!serviceVisibility);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px]">Public Profile</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
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
              value={publicProfile.businessPhone}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Business Email</label>
            <Input
              name="businessEmail"
              value={publicProfile.businessEmail}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Tag Line</label>
            <Input
              name="tagLine"
              value={publicProfile.tagLine}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Experience</label>
            <Input
              name="experience"
              value={publicProfile.experience}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Expensiveness</label>
            <Input
              name="expensiveness"
              value={publicProfile.expensiveness}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">
              Business Description
            </label>
            <Input
              name="businessDescription"
              value={publicProfile.businessDescription}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
        </form>

        {/* Service Visibility Toggle */}
        <div className="flex items-center mb-8">
          <label className="font-body text-[16px] mr-4">Service Visibility</label>
          <Switch checked={serviceVisibility} onCheckedChange={handleVisibilityToggle} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" className="m-3 w-full">
          Save Public Profile Information
        </Button>
      </div>
    </Fragment>
  );
};

export default EditPublicProfile;

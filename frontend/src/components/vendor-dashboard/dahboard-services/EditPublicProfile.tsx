"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessCategory from "@/components/vendor-signup/BusinessCategory";
interface PublicProfileData {
  businessCategory: string;
  businessPhone: string;
  businessEmail: string;
  tagLine: string;
  experience: string;
  expensiveness: string;
  businessDescription: string;
}

const EditPublicProfile: React.FC = () => {
  // Form state with demo data
  const [publicProfile, setPublicProfile] = useState<PublicProfileData>({
    businessCategory: "Florist",
    businessPhone: "+91-34-7890-1234",
    businessEmail: "johnflorists@email.com",
    tagLine: "we sell flowers",
    experience : "5 years",
    expensiveness: "$$$",
    businessDescription: "we don't have a description yet"
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPublicProfile((prevPublicProfile) => ({
      ...prevPublicProfile,
      [name]: value,
    }));
  };

  // Handle form submission (no backend yet, so this just prevents default behavior)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile saved successfully!");
    console.log(publicProfile); // This will log the updated profile in the browser console for now
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px] ">Public Profile</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px] ">Business Category</label>
            <Input
              name="businessCategory"
              value={publicProfile.businessCategory}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Business Phone</label>
            <Input
              name="businessPhone"
              value={publicProfile.businessPhone}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Business Email</label>
            <Input
              name="businessEmail"
              value={publicProfile.businessEmail}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Tag Line</label>
            <Input
              name="tagLine"
              value={publicProfile.tagLine}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Experience</label>
            <Input
              name="experienece"
              value={publicProfile.experience}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Expensiveness</label>
            <Input
              name="expensiveness"
              value={publicProfile.expensiveness}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Business Description</label>
            <Input
              name="businessDescription"
              value={publicProfile.businessDescription}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" className="m-3 w-full">
          Save Public Profile Informations
        </Button>
      </div>
    </Fragment>
  );
};

export default EditPublicProfile;

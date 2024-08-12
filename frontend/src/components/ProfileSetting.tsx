"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { AiOutlineEdit } from "react-icons/ai";

// The modal component for editing
import EditVisitorProfile from "./EditVisitorProfileModal";

const ProfileSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialProfileData = {
    firstName: "Hansika",
    lastName: "Karunathilake",
    partnerFirstName: "Janitha",
    partnerLastName: "Karunarathna",
    engagementDate: new Date("2025-07-14"),
    weddingDate: new Date("2027-07-14"),
    weddingVenue: "Sunset Beach Resort",
    email: "nostochk@gmail.com",
    password: "********",
  };

  const [profileData, setProfileData] = useState(initialProfileData);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (updatedData: any) => {
    setProfileData(updatedData);
  };

  return (
    <div className="container mx-auto px-4 m-14">
      <h2 className="text-4xl font-bold font-title text-center my-10">
        Profile Settings
      </h2>
      <div className="bg-secondary p-8 rounded-2xl relative">
        <AiOutlineEdit
          onClick={openModal}
          className="absolute top-4 right-4 cursor-pointer text-2xl"
        />
        <form className="grid sm:grid-cols-2 grid-cols-1 gap-0 sm:gap-16">
          <div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Full Name
              </label>
              <Input
                value={`${profileData.firstName} ${profileData.lastName}`}
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Partner&apos;s Name
              </label>
              <Input
                value={`${profileData.partnerFirstName} ${profileData.partnerLastName}`}
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Engagement Date
              </label>
              <Input
                value={profileData.engagementDate.toISOString().split("T")[0]}
                type="date"
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Wedding Date
              </label>
              <Input
                value={profileData.weddingDate.toISOString().split("T")[0]}
                type="date"
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Wedding Venue
              </label>
              <Input
                value={profileData.weddingVenue}
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Email Address
              </label>
              <Input
                value={profileData.email}
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="font-body block text-lg font-bold mb-2">
                Password
              </label>
              <Input
                type="password"
                value={profileData.password}
                readOnly
                className="font-body text-lg bg-gray-100"
              />
            </div>
          </div>
        </form>
      </div>
      <EditVisitorProfile
        isOpen={isModalOpen}
        onClose={closeModal}
        profileData={profileData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfileSetting;

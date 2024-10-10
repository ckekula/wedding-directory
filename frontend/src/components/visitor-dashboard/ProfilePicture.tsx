"use client";
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import profilePicPlaceholder from "../../assets/images/dashboardProfilePic.jpg";
//import profilePic from "../../../public/dashboard_profile_pic_placeholder.jpg"
import { useAuth } from "@/contexts/VisitorAuthContext";
import request from "@/utils/request";


interface ProfilePictureProps {
  profilePic: string | StaticImageData;
  setProfilePic: (image: string) => void;
}


const ProfilePicture: React.FC<ProfilePictureProps> = ({ profilePic, setProfilePic }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {visitor} = useAuth();

  const handleProfilePicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && visitor?.id) {
      const formData = new FormData();
      formData.append('file', file); // Append image file
      formData.append('visitorId', visitor.id); // Append visitor ID

      try {
        const response = await request.post('/upload/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file upload
          },
        });

        // Assuming the backend responds with the uploaded file URL
        const { fileUrl } = response.data;
        setProfilePic(fileUrl); // Set the uploaded image URL
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transform -rotate-12 shadow-lg cursor-pointer"
      onClick={handleProfilePicClick}
    >
      <Image
        src={profilePic}
        alt="dashboard profile picture"
        className="w-[175px] h-[175px] object-cover text-center"
        width={175}
        height={175}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleProfilePicChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfilePicture;

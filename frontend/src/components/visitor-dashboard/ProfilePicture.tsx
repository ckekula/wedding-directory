"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { uploadProfilePicture } from "@/api/upload/visitor.upload";
import { ProfilePictureProps } from "@/types/uploadTypes";

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
      try {
        const fileUrl = await uploadProfilePicture(file, visitor.id);
        setProfilePic(fileUrl || '/images/dashboardProfilePic.webp');
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transform  shadow-lg cursor-pointer"
      onClick={handleProfilePicClick}
    >
      <Image
        src={profilePic}
        alt="dashboard profile picture"
        width={288}
        height={200}
        className="object-cover rounded-lg"
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

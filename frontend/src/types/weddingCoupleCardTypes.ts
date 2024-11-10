import { StaticImageData } from "next/image";
import React from 'react';

export interface WeddingCoupleProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  profilePic: string | StaticImageData; // Similar type for profilePic
  setProfilePic: React.Dispatch<React.SetStateAction<string | StaticImageData>>; // Function to set the profile picture
}

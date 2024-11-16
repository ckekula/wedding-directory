import { StaticImageData } from "next/image";
import React from 'react';

export interface ProfilePictureProps {
    profilePic: string | StaticImageData;
    setProfilePic: React.Dispatch<React.SetStateAction<string | StaticImageData>>;
}
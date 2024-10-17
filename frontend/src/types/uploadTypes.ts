import { StaticImageData } from "next/image";

export interface ProfilePictureProps {
    profilePic: string | StaticImageData;
    setProfilePic: React.Dispatch<React.SetStateAction<string | StaticImageData>>;
}
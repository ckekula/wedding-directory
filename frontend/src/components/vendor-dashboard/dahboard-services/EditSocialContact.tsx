"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SocialContactData {
  websiteURL: string;
  xURL: string;
  tiktokURL: string;
  instagramURL: string;
  facebookURL: string;
  youtubeURL: string;
}

const EditSocialContact: React.FC = () => {
  // Form state with demo data
  const [socialContact, setSocialContact] = useState<SocialContactData>({
    websiteURL: "https://mybusiness.com",
    xURL: "https://x.com/mybusiness",
    tiktokURL: "https://tiktok.com/@mybusiness",
    instagramURL: "https://instagram.com/mybusiness",
    facebookURL: "https://facebook.com/mybusiness",
    youtubeURL: "https://youtube.com/mybusiness",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialContact((prevSocialContact) => ({
      ...prevSocialContact,
      [name]: value,
    }));
  };

  // Handle form submission (no backend yet, so this just prevents default behavior)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Social contact information saved successfully!");
    console.log(socialContact); // This will log the updated social contact data in the browser console for now
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px]">Social and Contact </h2>
        <hr className="w-[250px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px]">Website URL</label>
            <Input
              name="websiteURL"
              value={socialContact.websiteURL}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">X URL</label>
            <Input
              name="xURL"
              value={socialContact.xURL}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">TikTok URL</label>
            <Input
              name="tiktokURL"
              value={socialContact.tiktokURL}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Instagram URL</label>
            <Input
              name="instagramURL"
              value={socialContact.instagramURL}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Facebook Page URL</label>
            <Input
              name="facebookURL"
              value={socialContact.facebookURL}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">YouTube Channel URL</label>
            <Input
              name="youtubeURL"
              value={socialContact.youtubeURL}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" className="m-3 w-full">
          Save Social and Contact Links
        </Button>
      </div>
    </Fragment>
  );
};

export default EditSocialContact;

"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialData } from "@/types/serviceTypes";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_SERVICE_BY_ID } from "@/graphql/queries";
import { UPDATE_SERVICE_SOCIALS } from "@/graphql/mutations";
import toast from "react-hot-toast";

const EditSocialLinks: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

  const serviceData = data?.findOfferingById;

  const [profile, setProfile] = useState<SocialData>({
    websiteURL: "",
    xURL: "",
    tiktokURL: "",
    facebookURL: "",
    instagramURL: "",
  });

  useEffect(() => {
    if (serviceData) {
      setProfile({
        websiteURL: serviceData.website || "",
        xURL: serviceData.x || "",
        tiktokURL: serviceData.tiktok || "",
        facebookURL: serviceData.facebook || "",
        instagramURL: serviceData.instagram || "",
      });
    }
  }, [serviceData]);

  const [updateVendor] = useMutation(UPDATE_SERVICE_SOCIALS, {
    onCompleted: () => {
      toast.success("Updated Successfully!");
    },
    onError: (error) => {
      toast.error("Error updating");
      console.error("Error updating vendor:", error);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateVendor({
        variables: {
          id,
          input: {
            website: profile.websiteURL,
            x: profile.xURL,
            tiktok: profile.tiktokURL,
            facebook: profile.facebookURL,
            instagram: profile.instagramURL,
          },
        },
      });
      toast.success("Profile saved successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px]">Social Links</h2>
        <hr className="w-[250px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px]">Website URL</label>
            <Input
              name="websiteURL"
              value={profile.websiteURL || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">X URL</label>
            <Input
              name="xURL"
              value={profile.xURL || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">TikTok URL</label>
            <Input
              name="tiktokURL"
              value={profile.tiktokURL || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Instagram URL</label>
            <Input
              name="instagramURL"
              value={profile.instagramURL || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px]">Facebook Page URL</label>
            <Input
              name="facebookURL"
              value={profile.facebookURL || ""}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" onClick={handleSubmit} className="m-3 w-full">
          Save Social Links
        </Button>
      </div>
    </Fragment>
  );
};

export default EditSocialLinks;

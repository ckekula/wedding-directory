"use client";
import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdCloudUpload } from "react-icons/io";
import { uploadOfferingBanner } from '@/api/upload/offering/banner.upload';

interface EditPortfolioProps {
  offeringId: string | string[] | undefined; // Define the type for offeringId
}

const EditPortfolio: React.FC<EditPortfolioProps> = ({ offeringId }) => {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Handle Banner File Selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file

    if (file) {
      setBannerFile(file); // Update the state with the selected file

      // Generate a preview URL to display the selected image
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl); // Update the preview
    }
  };

  // Handle Save Button Click (Upload Image)
  const handleSaveBanner = async () => {
    if (bannerFile && offeringId) {
      try {
        const uploadedUrl = await uploadOfferingBanner(
          bannerFile,
          offeringId as string // Cast offeringId to string if necessary
        );
        console.log("Banner uploaded successfully. URL:", uploadedUrl);
      } catch (error) {
        console.error("Failed to upload banner:", error);
      }
    } else {
      console.error("No banner file or offeringId found.");
    }
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg mb-20">
        <h2 className="font-title text-[30px]">Portfolio</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>

        {/* Upload Banner Section */}
        <div className="mb-6 ">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">Upload Banner</label>
            {/* Save Button */}
            <button type="button" onClick={handleSaveBanner}>
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>

          {/* Banner Upload Area */}
          <div
            className="mt-3 w-container h-[100px] border border-gray-400 rounded-md flex justify-center items-center relative"
            onClick={() => document.getElementById("bannerUpload")?.click()} // Trigger the file explorer
          >
            <input
              id="bannerUpload"
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleBannerChange}
            />

            {bannerPreview ? (
              <Image
                src={bannerPreview}
                alt="Banner Preview"
                className="object-cover w-full h-full"
                width={900}
                height={600}
              />
            ) : (
              <>
                <CiCirclePlus size={30} className="text-orange" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-[12px] text-gray-500 font-body">
                  Click to upload image. (4mb Max)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPortfolio;

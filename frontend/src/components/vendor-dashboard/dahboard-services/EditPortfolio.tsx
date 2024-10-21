"use client";

import React, { Fragment, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import Image from "next/image";
import { uploadOfferingBanner } from "@/api/upload/offering/banner.upload";
import { uploadOfferingImageShowcase } from "@/api/upload/offering/imageShowcase.upload";

interface EditPortfolioProps {
  offeringId: string | string[] | undefined;
}

const EditPortfolio: React.FC<EditPortfolioProps> = ({ offeringId }) => {
  // State for Banner File Upload
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // State for Showcase Images (5 max)
  const [showcaseFiles, setShowcaseFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [showcasePreviews, setShowcasePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  // Handle Banner File Selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setBannerFile(file); // Update the banner file state

      // Generate a preview URL to display the selected image
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl); // Update the preview
    }
  };

  // Handle Save Button Click (Upload Banner)
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

  // Handle individual showcase image selection
  const handleShowcaseChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      const newShowcaseFiles = [...showcaseFiles];
      newShowcaseFiles[index] = file; // Replace the image at the specific index
      setShowcaseFiles(newShowcaseFiles); // Update the state

      // Generate a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      const newShowcasePreviews = [...showcasePreviews];
      newShowcasePreviews[index] = previewUrl;
      setShowcasePreviews(newShowcasePreviews); // Update the preview state
    }
  };

  // Handle Save Button Click (Upload Showcase Images)
  const handleSaveShowcase = async () => {
    // Filter out null values from the showcaseFiles array
    const filesToUpload = showcaseFiles.filter(
      (file) => file !== null
    ) as File[];

    if (filesToUpload.length > 0 && offeringId) {
      try {
        const uploadedUrls = await uploadOfferingImageShowcase(
          filesToUpload,
          offeringId as string
        );
        console.log(
          "Showcase images uploaded successfully. URLs:",
          uploadedUrls
        );
      } catch (error) {
        console.error("Failed to upload showcase images:", error);
      }
    } else {
      console.error("No images selected or offeringId not found.");
    }
  };

  // Function to render preview or placeholder for each image slot
  const renderPreview = (preview: string | null) => {
    return preview ? (
      <Image
        src={preview}
        alt="Preview"
        className="object-cover w-full h-full"
        width={100}
        height={100}
      />
    ) : (
      <CiCirclePlus size={30} className="text-orange" />
    );
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg mb-20">
        <h2 className="font-title text-[30px]">Portfolio</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>

        {/* Upload Banner Section */}
        <div className="mb-6">
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

        {/* Upload Showcase Images Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">
              Upload Showcase Images
            </label>
            {/* Save Button */}
            <button type="button" onClick={handleSaveShowcase}>
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>

          {/* Showcase Upload Area */}
          <div className="flex space-x-2 mt-3">
            {showcasePreviews.map((preview, index) => (
              <div
                key={index}
                className="w-screen h-[100px] border border-gray-400 rounded-md flex justify-center items-center relative"
                onClick={() =>
                  document.getElementById(`showcaseUpload-${index}`)?.click()
                }
              >
                <input
                  id={`showcaseUpload-${index}`}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleShowcaseChange(index, e)}
                />
                {renderPreview(preview)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPortfolio;

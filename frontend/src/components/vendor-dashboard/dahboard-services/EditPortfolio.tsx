"use client";
import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdCloudUpload } from "react-icons/io";
import { uploadOfferingBanner } from "@/api/upload/offering/banner.upload";
import { uploadOfferingImageShowcase } from "@/api/upload/offering/imageShowcase.upload";
import { uploadOfferingVideoShowcase } from "@/api/upload/offering/videoShowcase.upload";

interface EditPortfolioProps {
  offeringId: string | string[] | undefined; // Define the type for offeringId
}

const EditPortfolio: React.FC<EditPortfolioProps> = ({ offeringId }) => {
  // States for banner upload
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // States for photo showcase upload
  const [showcaseFiles, setShowcaseFiles] = useState<(File | null)[]>([null, null, null, null, null]);
  const [showcasePreviews, setShowcasePreviews] = useState<(string | null)[]>([null, null, null, null, null]);

  // States for video upload
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

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

  // Handle Showcase Image Selection
  const handleShowcaseChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file

    if (file) {
      const newFiles = [...showcaseFiles];
      const newPreviews = [...showcasePreviews];

      newFiles[index] = file; // Replace file at the specified index
      newPreviews[index] = URL.createObjectURL(file); // Generate preview for the new file

      setShowcaseFiles(newFiles);
      setShowcasePreviews(newPreviews);
    }
  };

  // Handle Video File Selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file

    if (file) {
      setVideoFile(file); // Update the state with the selected video

      // Generate a preview URL to display the selected video
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl); // Update the preview
    }
  };

  // Handle Save Banner
  const handleSaveBanner = async () => {
    if (bannerFile && offeringId) {
      try {
        const uploadedUrl = await uploadOfferingBanner(bannerFile, offeringId as string);
        console.log("Banner uploaded successfully. URL:", uploadedUrl);
      } catch (error) {
        console.error("Failed to upload banner:", error);
      }
    } else {
      console.error("No banner file or offeringId found.");
    }
  };

  // Handle Save Showcase Images
  const handleSaveShowcase = async () => {
    const filesToUpload = showcaseFiles.filter((file) => file !== null) as File[]; // Filter out null values

    if (filesToUpload.length > 0 && offeringId) {
      try {
        const uploadedUrls = await uploadOfferingImageShowcase(filesToUpload, offeringId as string);
        console.log("Showcase images uploaded successfully. URLs:", uploadedUrls);
      } catch (error) {
        console.error("Failed to upload showcase images:", error);
      }
    } else {
      console.error("No showcase files or offeringId found.");
    }
  };

  // Handle Save Video
  const handleSaveVideo = async () => {
    if (videoFile && offeringId) {
      try {
        const uploadedUrl = await uploadOfferingVideoShowcase([videoFile], offeringId as string);
        console.log("Video uploaded successfully. URL:", uploadedUrl);
      } catch (error) {
        console.error("Failed to upload video:", error);
      }
    } else {
      console.error("No video file or offeringId found.");
    }
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
            <button type="button" onClick={handleSaveBanner}>
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>
          <div className="mt-3 w-container h-[250px] border border-gray-400 rounded-md flex justify-center items-center relative">
            <input
              id="bannerUpload"
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleBannerChange}
            />
            {bannerPreview ? (
              <Image src={bannerPreview} alt="Banner Preview" className="object-cover w-full h-full" width={900} height={600} />
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

        {/* Upload Showcase Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">Upload photo showcase</label>
            <button type="button" onClick={handleSaveShowcase}>
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>
          <div className="mt-3 flex space-x-2 w-container">
            {showcasePreviews.map((preview, index) => (
              <div key={index} className="w-screen h-[100px] border border-gray-400 rounded-md flex justify-center items-center relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleShowcaseChange(index)}
                />
                {preview ? (
                  <Image src={preview} alt={`Showcase Preview ${index}`} className="object-cover w-full h-full" width={100} height={100} />
                ) : (
                  <CiCirclePlus size={30} className="text-orange" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upload Video Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">Upload a video</label>
            <button type="button" onClick={handleSaveVideo}>
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>
          <div className="mt-3 w-container h-[250px] border border-gray-400 rounded-md flex justify-center items-center relative">
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleVideoChange}
            />
            {videoPreview ? (
              <video className="object-cover w-full h-full" controls>
                <source src={videoPreview} type="video/mp4" />
              </video>
            ) : (
              <CiCirclePlus size={30} className="text-orange" />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPortfolio;

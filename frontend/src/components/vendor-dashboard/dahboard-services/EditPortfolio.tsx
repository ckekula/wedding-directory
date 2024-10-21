"use client";
import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdCloudUpload } from "react-icons/io";

const EditPortfolio: React.FC = () => {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Handle Banner File Selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBannerFile(e.target.files[0]);
    }
  };

  // Handle Photo Showcase File Selection
  const handlePhotoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = [...photoFiles];
    if (e.target.files) {
      files[index] = e.target.files[0];
      setPhotoFiles(files);
    }
  };

  // Handle Video File Selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
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
            <button type="button">
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>

          <div className="mt-3 w-container h-[100px] border border-gray-400 rounded-md flex justify-center items-center relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleBannerChange}
            />
            <CiCirclePlus size={30} className="text-orange" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-[12px] text-gray-500 font-body">
              Click to upload image. (4mb Max)
            </p>
          </div>
        </div>

        {/* Upload Photo Showcase */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">
              Upload photo showcase
            </label>
            <button type="button">
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>
          <div className="mt-3 flex gap-3">
            {photoFiles.map((_, index) => (
              <div
                key={index}
                className="w-screen h-[100px] border border-gray-400 rounded-md flex justify-center items-center relative"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handlePhotoChange(index, e)}
                />
                <CiCirclePlus size={30} className="text-orange" />
              </div>
            ))}
          </div>
        </div>

        {/* Upload Video Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">Upload a video</label>
            <button type="button">
              <IoMdCloudUpload size={25} className="text-orange" />
            </button>
          </div>
          <div className="mt-3 w-container h-[100px] border border-gray-400 rounded-md flex justify-center items-center relative">
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleVideoChange}
            />
            <CiCirclePlus size={30} className="text-orange" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPortfolio;

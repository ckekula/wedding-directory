"use client";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdCloudUpload, IoMdTrash } from "react-icons/io";
import { uploadOfferingBanner } from "@/api/upload/offering/banner.upload";
import { uploadOfferingImageShowcase } from "@/api/upload/offering/imageShowcase.upload";
import { uploadOfferingVideoShowcase } from "@/api/upload/offering/videoShowcase.upload";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_PORTFOLIO_BY_ID, DELETE_SHOWCASE_IMAGE, DELETE_BANNER_IMAGE, DELETE_SHOWCASE_VIDEO } from "@/graphql/queries";

const EditPortfolio: React.FC = () => {
  const params = useParams();
  // Ensure id is a string
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { loading, error, data, refetch: refetchPortfolio } = useQuery(FIND_PORTFOLIO_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const portfolio = data?.findOfferingById;

  // States for banner upload
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // States for photo showcase upload
  const [showcaseFiles, setShowcaseFiles] = useState<(File | null)[]>([null, null, null, null, null]);
  const [showcasePreviews, setShowcasePreviews] = useState<(string | null)[]>([null, null, null, null, null]);

  // States for video upload
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [deleteBannerImage] = useMutation(DELETE_BANNER_IMAGE);
  const [deleteShowcaseImage] = useMutation(DELETE_SHOWCASE_IMAGE);
  const [deleteShowcaseVideo] = useMutation(DELETE_SHOWCASE_VIDEO);

  const [isUploading, setIsUploading] = useState(false);

  // Update the state when data is fetched
  useEffect(() => {
    if (portfolio) {
      if (portfolio.banner) {
        setBannerPreview(portfolio.banner);
      }
      // Initialize showcasePreviews with nulls if no data exists
      const initialPreviews = Array(5).fill(null);
      if (portfolio.photo_showcase && Array.isArray(portfolio.photo_showcase)) {
        // Fill available images into the array, leaving rest as null
        portfolio.photo_showcase.forEach((url: string, index: number) => {
          if (index < 5) initialPreviews[index] = url;
        });
      }
      setShowcasePreviews(initialPreviews);
      if (portfolio.video_showcase) {
        setVideoPreview(portfolio.video_showcase);
      }
    }
  }, [portfolio]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    if (bannerFile && id) {
      try {
        const uploadedUrl = await uploadOfferingBanner(bannerFile, id as string);
        console.log("Banner uploaded successfully. URL:", uploadedUrl);
        toast.success("Banner uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload banner:", error);
        toast.error("Failed to upload banner.");
      }
    } else {
      console.error("No banner file or offeringId found.");
    }
  };

  // Modify handleSaveShowcase function
  const handleSaveShowcase = async () => {
    setIsUploading(true);
    try {
      const filesToUpload = showcaseFiles.filter((file) => file !== null) as File[];

      if (filesToUpload.length > 0 && id) {
        // Upload new files
        const uploadedUrls = await uploadOfferingImageShowcase(filesToUpload, id);

        // Create new array combining existing and new URLs
        const updatedPreviews = showcasePreviews.map((currentPreview, index) => {
          // If there's a new file at this index, use the new URL
          if (showcaseFiles[index]) {
            const fileIndex = filesToUpload.findIndex(file => file === showcaseFiles[index]);
            return uploadedUrls[fileIndex];
          }
          // Otherwise keep the existing preview
          return currentPreview;
        });

        // Update state
        setShowcasePreviews(updatedPreviews);
        setShowcaseFiles(Array(5).fill(null));
        
        // Refresh the portfolio data
        await refetchPortfolio();
        
        toast.success("Images uploaded successfully!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Upload failed: " + error.message);
      } else {
        toast.error("Upload failed: Unknown error");
      }
      if (error instanceof Error) {
        toast.error("Upload failed: " + error.message);
      } else {
        toast.error("Upload failed: Unknown error");
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Save Video
  const handleSaveVideo = async () => {
    if (videoFile && id) {
      try {
        const uploadedUrl = await uploadOfferingVideoShowcase([videoFile], id as string);
        console.log("Video uploaded successfully. URL:", uploadedUrl);
        toast.success("Video uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload video:", error);
        toast.error("Failed to upload video.");
      }
    } else {
      console.error("No video file or offeringId found.");
    }
  };

  // Handle Delete Showcase Image
  const handleDeleteShowcase = async (index: number) => {
    if (!id) return;
    try {
      await deleteShowcaseImage({
        variables: { id, index },
      });
      // Update local state after successful deletion
      const newPreviews = [...showcasePreviews];
      const newFiles = [...showcaseFiles];
      newPreviews[index] = null;
      newFiles[index] = null;
      setShowcasePreviews(newPreviews);
      setShowcaseFiles(newFiles);
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image.");
    }
  };

  // Handle Delete Banner
  const handleDeleteBanner = async () => {
    if (!id) return;
    try {
      await deleteBannerImage({
        variables: { id },
      });
      setBannerPreview(null);
      setBannerFile(null);
      toast.success("Banner deleted successfully!");
    } catch (error) {
      console.error("Failed to delete banner:", error);
      toast.error("Failed to delete banner.");
    }
  };

  // Handle Delete Video
  const handleDeleteVideo = async () => {
    if (!id) return;
    try {
      await deleteShowcaseVideo({
        variables: { id },
      });
      setVideoPreview(null);
      setVideoFile(null);
      toast.success("Video deleted successfully!");
    } catch (error) {
      console.error("Failed to delete video:", error);
      toast.error("Failed to delete video.");
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
            <div className="flex gap-2">
              {bannerPreview && (
                <button type="button" onClick={handleDeleteBanner}>
                  <IoMdTrash size={25} className="text-red-500" />
                </button>
              )}
              <button type="button" onClick={handleSaveBanner}>
                <IoMdCloudUpload size={25} className="text-orange" />
              </button>
            </div>
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
          <div className="flex justify-between items-center mb-4">
            <label className="font-body text-[16px]">Upload photo showcase</label>
            <button 
              type="button" 
              onClick={handleSaveShowcase}
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                <IoMdCloudUpload size={25} className="text-orange" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="relative w-full">
                  <div
                    className="aspect-square w-full border-2 border-gray-300 rounded-lg 
                             flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 
                             transition-colors duration-200"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={handleShowcaseChange(index)}
                    />
                    {showcasePreviews[index] ? (
                      <>
                        <div className="relative w-full h-full">
                          <Image
                            src={showcasePreviews[index] as string}
                            alt={`Showcase Preview ${index}`}
                            className="object-cover rounded-lg"
                            fill
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteShowcase(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full 
                                   shadow-md z-20 hover:bg-red-50 transition-colors duration-200"
                          >
                            <IoMdTrash size={18} className="text-red-500" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center p-4">
                        <CiCirclePlus size={30} className="text-orange mb-2" />
                        <span className="text-xs text-gray-500">Image {index + 1}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Upload Video Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="font-body text-[16px]">Upload a video</label>
            <div className="flex gap-2">
              {videoPreview && (
                <button type="button" onClick={handleDeleteVideo}>
                  <IoMdTrash size={25} className="text-red-500" />
                </button>
              )}
              <button type="button" onClick={handleSaveVideo}>
                <IoMdCloudUpload size={25} className="text-orange" />
              </button>
            </div>
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

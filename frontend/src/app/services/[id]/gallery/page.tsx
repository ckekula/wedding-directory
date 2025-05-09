"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { FIND_SERVICE_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Header from "@/components/shared/Headers/Header";
import Link from "next/link";
import LoaderQuantum from "@/components/shared/Loaders/LoaderQuantum";
import { FaArrowLeft } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FaPlay, FaVideo } from "react-icons/fa";
import Image from "next/image";

const PortfolioPage: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video";
    url: string;
    index: number;
  } | null>(null);

  // Track loaded images to show a loading state
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

  const offering = data?.findOfferingById;

  const allMedia = useMemo(() => [
    ...(offering?.banner ? [{ type: "image", url: offering.banner }] : []),
    ...(offering?.photo_showcase?.map((url: string) => ({
      type: "image",
      url,
    })) || []),
    ...(offering?.video_showcase?.map((url: string) => ({
      type: "video",
      url,
    })) || []),
  ], [offering]);

  const navigateMedia = useCallback((direction: "prev" | "next") => {
    if (!selectedMedia) return;

    const newIndex =
      direction === "next"
        ? (selectedMedia.index + 1) % allMedia.length
        : (selectedMedia.index - 1 + allMedia.length) % allMedia.length;

    setSelectedMedia({
      type: allMedia[newIndex].type,
      url: allMedia[newIndex].url,
      index: newIndex,
    });
  }, [selectedMedia, allMedia]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        navigateMedia("next");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        navigateMedia("prev");
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateMedia, selectedMedia]);

  const handleImageLoaded = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  const openLightbox = (index: number) => {
    setSelectedMedia({
      type: allMedia[index].type,
      url: allMedia[index].url,
      index,
    });
  };

  const closeLightbox = () => setSelectedMedia(null);

  if (loading) return <LoaderQuantum />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-lightYellow min-h-screen font-body ">
      <Header />
      <div className="w-11/12 md:w-10/12 lg:w-3/4 xl:w-2/3 mx-auto py-6 px-4">
        <Link
          href={`/services/${id}`}
          className="flex items-center mb-6 text-gray-700 hover:text-orange"
        >
          <FaArrowLeft className="mr-2" /> Back to {offering?.name}
        </Link>

        <h1 className="text-3xl font-bold mb-6">{offering?.name} - Gallery</h1>

        {/* Masonry Grid Layout */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2 }}>
          <Masonry gutter="16px">
            {allMedia.map((media, index) => (
              <div
                key={index}
                className="mb-4 overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all relative"
                onClick={() => openLightbox(index)}
              >
                {media.type === "image" ? (
                  <>
                    <div
                      className={`absolute inset-0 bg-gray-200 animate-pulse ${
                        loadedImages[media.url] ? "hidden" : "flex"
                      }`}
                    >
                      <div className="m-auto">Loading...</div>
                    </div>
                    <Image
                      src={media.url}
                      alt={`${offering?.name} - Image ${index}`}
                      className="w-full object-cover hover:scale-105 transition-transform"
                      loading="lazy"
                      onLoad={() => handleImageLoaded(media.url)}
                      style={{ minHeight: "150px" }}
                      width={1000}
                      height={1000}
                    />
                  </>
                ) : (
                  // Video thumbnail
                  <div
                    className="relative w-full bg-black"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <video src={media.url} className="w-full object-cover" />

                    {/* Enhanced video indicator */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Play button with hover effect */}
                      <div className="w-16 h-16 bg-orange/70 hover:bg-orange transition-colors rounded-full flex items-center justify-center shadow-lg group">
                        <FaPlay className="text-white text-xl ml-1" />
                      </div>

                      {/* Video label */}
                      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full flex items-center">
                        <FaVideo className="mr-1" /> Video
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        <div className="text-center mt-12 mb-6 py-8 border-t border-gray-200">
          <p className="text-xl font-medium text-gray-600">
            You&apos;ve seen it all!
          </p>
          <p className="text-2xl font-bold mt-2 mb-6">
            Still looking for the perfect match?
          </p>
          <Link
            href="/vendor-search"
            className="border-2 border-orange hover:border-orange hover:bg-orange hover:text-white  text-black py-3 px-6 rounded-[22px] transition-colors font-medium text-lg inline-flex items-center"
          >
            Continue browsing vendors
          </Link>
        </div>
      </div>

      {/* Lightbox/Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300"
          >
            ×
          </button>

          <button
            onClick={() => navigateMedia("prev")}
            className="absolute left-6 text-white text-5xl hover:text-gray-300"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="w-full max-w-6xl max-h-[80vh]">
            {selectedMedia.type === "image" ? (
              <Image
                src={selectedMedia.url}
                alt={`${offering?.name} - Gallery`}
                className="w-full h-full object-contain"
                
                width={1000}
                height={1000}
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full max-h-[80vh]"
              />
            )}
          </div>

          <button
            onClick={() => navigateMedia("next")}
            className="absolute right-6 text-white text-5xl hover:text-gray-300"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-6 text-white text-sm">
            {selectedMedia.index + 1} / {allMedia.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;

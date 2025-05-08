"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RiGalleryView2 } from "react-icons/ri";

interface PortfolioImagesProps {
  banner?: string | null;
  photoShowcase?: string[] | null;
  hasMoreMedia?: boolean | null;
  totalMediaCount?: number | null;
  portfolioLink?: string | null;
}

const PortfolioImages: React.FC<PortfolioImagesProps> = ({
  banner,
  photoShowcase = [],
  hasMoreMedia = false,
  totalMediaCount = 0,
  portfolioLink,
}) => {
  const hasImages = banner || (photoShowcase && photoShowcase.length > 0);
  const images = hasImages
    ? [banner, ...(photoShowcase || [])].filter((img): img is string =>
        Boolean(img)
      )
    : ["/images/offeringPlaceholder.webp"];

  // Helper function to render the "View more" overlay
  const renderViewMoreOverlay = (index: number) => {
    if (hasMoreMedia && portfolioLink && index === images.length - 1) {
      const moreCount = (totalMediaCount || 0) - images.length;
      if (moreCount <= 0) return null;

      return (
        <Link
          href={portfolioLink}
          className="absolute bottom-0 right-0 m-4 z-10"
        >
          <div className="flex border-2 border-slate-700 items-center gap-2 bg-slate-400 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl group-hover:scale-105">
            <RiGalleryView2 className="text-lg text-slate-900" />
            <span className="font-title font-bold text-slate-800">See all</span>
            
          </div>
        </Link>
      );
    }
    return null;
  };

  if (images.length === 1) {
    // Single image layout
    return (
      <div className="w-full max-w-7xl mx-auto overflow-hidden h-[500px] relative rounded-lg">
        <Image
          src={images[0]}
          alt="Service Image"
          className="w-full h-full object-cover"
          fill
          priority
        />
        {renderViewMoreOverlay(0)}
      </div>
    );
  }

  if (images.length === 2) {
    // Two images layout - split in two equal columns
    return (
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          {images.map((photo, index) => (
            <div
              key={index}
              className="relative w-full h-full overflow-hidden rounded-lg"
            >
              <Image
                src={photo}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover"
                fill
                priority={index === 0}
              />
              {renderViewMoreOverlay(index)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 3) {
    // Three images layout - first image in left column, two images stacked in right column
    return (
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          {/* First image - full height left column */}
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src={images[0]}
              alt="Main Image"
              className="w-full h-full object-cover"
              fill
              priority
            />
          </div>

          {/* Right column with two stacked images */}
          <div className="grid grid-rows-2 gap-4 h-full">
            {images.slice(1).map((photo, index) => {
              const actualIndex = index + 1;
              return (
                <div
                  key={index}
                  className="relative w-full h-full overflow-hidden rounded-lg"
                >
                  <Image
                    src={photo}
                    alt={`Portfolio image ${actualIndex + 1}`}
                    className="w-full h-full object-cover"
                    fill
                  />
                  {renderViewMoreOverlay(actualIndex)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 4) {
    // Four images layout - first image in left column, three images in right column grid
    return (
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          {/* First image - full height left column */}
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src={images[0]}
              alt="Main Image"
              className="w-full h-full object-cover"
              fill
              priority
            />
          </div>

          {/* Right column with one top image and two bottom images */}
          <div className="grid grid-rows-2 gap-4 h-full">
            {/* Top image taking full width */}
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src={images[1]}
                alt="Portfolio image 2"
                className="w-full h-full object-cover"
                fill
              />
            </div>

            {/* Bottom row with two images */}
            <div className="grid grid-cols-2 gap-4">
              {images.slice(2).map((photo, index) => {
                const actualIndex = index + 2;
                return (
                  <div
                    key={index}
                    className="relative w-full h-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={photo}
                      alt={`Portfolio image ${actualIndex + 1}`}
                      className="w-full h-full object-cover"
                      fill
                    />
                    {renderViewMoreOverlay(actualIndex)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // More than 4 images - masonry grid layout
  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[50px] sm:auto-rows-[100px] lg:auto-rows-[200px]">
        {/* Banner Image (Spanning Full Width) */}
        <div className="relative w-full h-full row-span-2 sm:row-span-2 lg:row-span-2 col-span-2 sm:col-span-2 lg:col-span-2 overflow-hidden rounded-lg">
          <Image
            src={images[0]}
            alt="Banner Image"
            className="w-full h-full object-cover"
            fill
            priority
          />
        </div>

        {/* Showcase Images */}
        {images.slice(1, 5).map((photo, index) => {
          const actualIndex = index + 1;
          // Render overlay on the last showcase image (4th one)
          const isLastShowcaseImage = index === 3;

          return (
            <div
              key={index}
              className="relative w-full h-full overflow-hidden rounded-lg"
            >
              <Image
                src={photo}
                alt={`Portfolio image ${actualIndex + 1}`}
                className="w-full h-full object-cover"
                fill
              />
              {isLastShowcaseImage && renderViewMoreOverlay(4)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioImages;

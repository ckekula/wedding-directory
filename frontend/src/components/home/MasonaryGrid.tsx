'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    id: 1,
    src: "/images/photography.webp",
    alt: "Photographers",
    label: "Browse galleries to find your look",
  },
  {
    id: 2,
    src: "/images/cakes.webp",
    alt: "Wedding Cakes",
    label: "Discover the perfect cake for your big day",
  },
  {
    id: 3,
    src: "/images/invitation.webp",
    alt: "Invitations",
    label: "Explore elegant invitation designs",
  },
  {
    id: 4,
    src: "/images/preshoot.webp",
    alt: "Pre-wedding Shoots",
    label: "Capture memories with a pre-wedding shoot",
  },
  {
    id: 5,
    src: "/images/tablesetting.webp",
    alt: "Table Settings",
    label: "Find inspiration for your wedding table settings",
  },
  {
    id: 6,
    src: "/images/transportation.webp",
    alt: "Transportation",
    label: "Arrange stylish transportation for your wedding",
  },
  {
    id: 7,
    src: "/images/DJ.webp",
    alt: "Wedding DJ",
    label: "Find the perfect DJ to keep the party going",
  },
  {
    id: 8,
    src: "/images/bride.webp",
    alt: "Bridal Looks",
    label: "Get inspired by stunning bridal looks",
  },
];

const MasonaryGrid = () => {

  return (
    <div>
      <section className=" bg-background p-16">
        <h2 className="text-5xl font-bold text-center font-title pt-8 pb-4">
          Locate Vendors For Every Vibe
        </h2>
        <p className="text-center mb-8 font-bod text-xl font-body pb-4">
          Find Top-Rated Pros for Every Budget, Background, and Style
        </p>
        <div className="container mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
            {photos.map((photo) => (
              <Link
                href="/vendor-search"
                key={photo.id}
                className="relative group overflow-hidden rounded-lg break-inside-avoid"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                  <h3 className="text-white text-xl font-bold font-title text-center ">
                    {photo.alt}
                  </h3>
                  <p className="text-white mt-2 font-body text-center">
                    {photo.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasonaryGrid;

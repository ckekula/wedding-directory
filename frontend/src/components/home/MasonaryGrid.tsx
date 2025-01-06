"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const MasonaryGrid = () => {
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

  return (
    <section className="bg-background p-4 md:p-8 sm:p-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-title pt-8 pb-4">
        Locate Vendors For Every Vibe
      </h2>
      <p className="text-center mb-8 font-body text-xl pb-4">
        Find Top-Rated Pros for Every Budget, Background, and Style
      </p>
      <div className="container mx-auto max-w-full sm:max-w-screen-sm lg:max-w-screen-xl">
      <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 space-y-4 px-0 sm:p-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative overflow-hidden rounded-lg break-inside-avoid group"
              >
                <Link href="/vendor-search" className="block">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-lg"
                    width={500}
                    height={500}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="text-white text-xl font-bold font-title">
                        {photo.alt}
                      </h3>
                      <p className="text-white mt-2 font-body">{photo.label}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default MasonaryGrid;

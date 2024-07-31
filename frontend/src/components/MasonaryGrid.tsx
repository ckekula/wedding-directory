import React from "react";
import Image from "next/image";
const MasonaryGrid = () => {
  const photos = [
    {
      id: 1,
      src: "/photography.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },
    {
      id: 2,
      src: "/cakes.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },

    {
      id: 6,
      src: "/invitation.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },

    {
      id: 6,
      src: "/preshoot.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },
    {
      id: 7,
      src: "/tablesetting.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },
    {
      id: 8,
      src: "/transportation.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },
    {
      id: 9,
      src: "/Dj.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },
    {
      id: 6,
      src: "/bride.jpg",
      alt: "photographers",
      label: "Browse galleries to find your look",
    },
  ];

  return (
    <div>
      <section className=" bg-background">
        <h2 className="text-5xl font-bold text-center  font-title pt-8 pb-4">
          Locate Vendors For Every Vibe
        </h2>
        <p className="text-center mb-8 font-bod text-xl font-body pb-4">
          Find Top-Rated Pros for Every Budget, Background, and Style
        </p>
        <div className="container mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group overflow-hidden rounded-lg break-inside-avoid"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  layout="responsive"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-xl font-bold font-title">
                    {photo.alt}
                  </h3>
                  <p className="text-white mt-2 font-body">{photo.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasonaryGrid;

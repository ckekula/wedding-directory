"use client";

import Header from "@/components/shared/Headers/Header";
import React from "react";
import { CiStar, CiBookmark } from "react-icons/ci";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FIND_SERVICE_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import SocialIcons from "@/components/vendor-dashboard/dahboard-services/socialIcons";
import { FiEdit } from "react-icons/fi";
import Reviews from "@/components/vendor-dashboard/dahboard-services/reviews";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import Link from "next/link";
import LoaderQuantum from "@/components/shared/Loaders/LoaderQuantum";
import Comments from "@/components/vendor-dashboard/dahboard-services/Comments";
import WriteReview from "@/components/vendor-dashboard/dahboard-services/WriteReview";

const Service: React.FC = () => {
  const { vendor } = useVendorAuth();
  const params = useParams();
  const { id } = params;

  const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

  if (loading) return <LoaderQuantum />;
  if (error) return <p>Error: {error.message}</p>;

  const service = data?.findOfferingById;
  const portfolioImages = service.photo_showcase || [
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
  ];
  const video = service.video_showcase;
    
    return (
      <div className="bg-lightYellow font-body">
        <Header />
        <div className="md:mx-40 my-4 p-4">
          <Link href="/vendor-dashboard">
            <button className="text-black font-body hover:text-gray-500 mr-2">
              &larr;
            </button>
            back
          </Link>

          {/* Portfolio Image Section */}
          <div>
            <section>
              <div className="container mx-auto p-4">
                {/* Photo Showcase */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Photo Showcase</h2>
                  <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
                    {portfolioImages.map((photo: string, index: number) => (
                      <div
                        key={index}
                        className="break-inside-avoid overflow-hidden rounded-lg mb-4"
                      >
                        <Image
                          src={photo}
                          alt={`Portfolio image ${index + 1}`}
                          className="w-full h-auto object-cover"
                          layout="responsive"
                          width={500}
                          height={500}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Showcase */}
                {video && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Video Showcase</h2>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-full object-cover"
                        poster="/images/video-thumbnail.jpg" // Add a placeholder image if available
                      >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="flex flex-row gap-x-5">
            <div className="w-3/4">
              {/* General Section */}
              <div className="bg-white rounded-2xl p-4 mb-4">
                <div className="flex flex-row">
                  <div className="w-8/12 flex flex-col">
                    <div className="text-xl">
                      {service?.vendor.busname || "Vendor name not available"}
                    </div>
                    <div className="flex flex-row text-3xl font-bold">
                      {service?.name}
                      <div className="ml-2 flex flex-row justify-center items-center gap-x-1">
                        {service?.vendor.id === vendor?.id ? (
                          <Link href={`/services/edit/${service?.id}`}>
                            <FiEdit className="text-orange hover:text-black" />
                          </Link>
                        ) : (
                          <CiBookmark />
                        )}
                      </div>
                    </div>
                    <div>{service?.vendor.city}</div>
                  </div>
                  <SocialIcons service={service} />
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white rounded-2xl p-4 flex flex-col">
                <div className="mb-3 text-2xl font-bold font-title">
                  About the Vendor
                </div>
                <div>
                  <p>{service.vendor.about || "About not available"}</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />

                <div className="mb-3 text-2xl font-bold">Details</div>
                <div>
                  <p>{service.description || "Description not available"}</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />

                <div className="mb-3 text-2xl font-bold font-title">
                  Pricing
                </div>
                <div>
                  <p>{service.pricing || "Pricing details not available"}</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="mb-3 text-2xl font-bold font-title">
                  Reviews
                </div>
                <div>
                  <Reviews />
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="mb-3 text-2xl font-bold font-title">
                  Write a Review
                </div>
                <div>
                  <WriteReview />
                </div>
                <div>
                  <Comments />
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="mb-3 text-2xl font-bold font-title">
                  Contact
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Email: {service.bus_email || "Email not available"}</div>
                  <div>
                    Phone number:{" "}
                    {service.bus_phone || "Phone number not available"}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/4">
              <div className="bg-white rounded-2xl p-4 flex flex-col sticky top-4">
                <p className="text-xl font-bold font-title">Message Vendor</p>
                <p className="text-sm font-body mt-10">Coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Service;
"use client";

import Header from "@/components/shared/Headers/Header";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FIND_MY_VENDOR_BY_ID, FIND_SERVICE_BY_ID } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import SocialIcons from "@/components/vendor-dashboard/dahboard-services/socialIcons";
import { FiEdit } from "react-icons/fi";
import Reviews from "@/components/vendor-dashboard/dahboard-services/reviews";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import Link from "next/link";
import LoaderQuantum from "@/components/shared/Loaders/LoaderQuantum";
import Comments from "@/components/vendor-dashboard/dahboard-services/Comments";
import WriteReview from "@/components/vendor-dashboard/dahboard-services/WriteReview";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { ADD_TO_MY_VENDORS, REMOVE_FROM_MY_VENDORS } from "@/graphql/mutations";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import Packages from "@/components/vendor-dashboard/dahboard-services/Packages";
import QuoteRequestWidget from "@/components/chat/QuoteRequestWidget";
import GoogleMapComponent from "@/components/vendor-dashboard/dahboard-services/Map";

const Service: React.FC = () => {
  const { vendor } = useVendorAuth();
  const { visitor } = useAuth();
  const params = useParams();
  const { id } = params;

  const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

  // Check if offering is in visitor's my vendors
  const { loading: myVendorLoading, data: myVendorData } = useQuery(
    FIND_MY_VENDOR_BY_ID,
    {
      variables: {
        visitorId: visitor?.id,
        offeringId: id,
      },
      skip: !visitor,
    }
  );

  const [isInMyVendors, setIsInMyVendors] = useState(false);
  const [addToMyVendors] = useMutation(ADD_TO_MY_VENDORS);
  const [removeFromMyVendors] = useMutation(REMOVE_FROM_MY_VENDORS);

  // Update isInMyVendors when myVendorData changes
  useEffect(() => {
    if (myVendorData?.findMyVendorById) {
      setIsInMyVendors(true);
    }
  }, [myVendorData]);

  if (loading || myVendorLoading) return <LoaderQuantum />;
  if (error) return <p>Error: {error.message}</p>;

  const offering = data?.findOfferingById;
  const isVendorsOffering = offering?.vendor.id === vendor?.id;

  const portfolioImages = offering.photo_showcase || [
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
  ];
  //const video = service.video_showcase;

  const handleHeartClick = async () => {
    if (!visitor) {
      toast.error("Please login to save to your vendors");
      return;
    }

    if (!id) {
      toast.error("Service does not exist");
      return;
    }

    try {
      if (isInMyVendors) {
        const { data } = await removeFromMyVendors({
          variables: {
            visitorId: visitor.id,
            offeringId: id,
          },
        });

        if (data?.removeFromMyVendors) {
          setIsInMyVendors(false);
          toast.success("Removed from your vendors");
        } else {
          throw new Error("Failed to remove from vendors");
        }
      } else {
        const { data } = await addToMyVendors({
          variables: {
            visitorId: visitor.id,
            offeringId: id,
          },
        });

        if (data?.addToMyVendors) {
          setIsInMyVendors(true);
          toast.success(
            <div>
              Saved to your vendors! <br />
              <Link
                href={`/visitor-dashboard/my-vendors/${id}`}
                className="underline"
              >
                View your vendors
              </Link>
            </div>,
            {
              duration: 8000,
            }
          );
        } else {
          throw new Error("Failed to add to vendors");
        }
      }
    } catch (error) {
      console.error("Error saving to myVendors:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="bg-lightYellow font-body">
      <Header />
      <div className="md:mx-40 my-4 p-4">
        <Link href="/vendor-dashboard">
          <button className="text-black font-body hover:text-gray-500 mr-2">
            ←
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
              {/* {video && (
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
                )} */}
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
                    {offering?.vendor.busname || "Vendor name not available"}
                  </div>
                  <div className="flex flex-row text-3xl font-bold">
                    {offering?.name}
                    <div className="flex flex-row justify-center items-center">
                      {isVendorsOffering ? (
                        <Link href={`/services/edit/${offering?.id}`}>
                          <FiEdit className="text-2xl text-orange hover:text-black" />
                        </Link>
                      ) : (
                        <button onClick={handleHeartClick}>
                          {isInMyVendors ? (
                            <FaHeart className="text-red-500 hover:text-red-600 hover:cursor-pointer" />
                          ) : (
                            <CiHeart className="hover:text-red-500 hover:cursor-pointer" />
                          )}
                        </button>
                      )}
                    </div>
                    <div>{offering?.vendor.city}</div>
                  </div>
                  <SocialIcons offering={offering} />
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white rounded-2xl p-4 flex flex-col">
                <div className="mb-3 text-2xl font-bold">
                  About the Vendor
                </div>
                <div>
                  <p>{offering.vendor.about || "Not available"}</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />

                <div className="mb-3 text-2xl font-bold">Details</div>
                <div>
                  <p>{offering.description || "Not available"}</p>
                </div>
                <hr className="border-t border-gray-300 my-4" />

                <div className="mb-3 text-2xl font-bold">
                  Pricing
                </div>
                <div>
                  <p>{offering.pricing || ""}</p>
                  <Packages/>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="mb-3 text-2xl font-bold">
                  Reviews
                </div>
                <div>
                  <Reviews serviceId={offering?.id} />
                </div>
                <div>
                  <WriteReview serviceId={offering?.id} />
                </div>
                <div>
                  <Comments serviceId={offering?.id} />
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="mb-3 text-2xl font-bold">
                  Contact
                </div>
                <div className="flex flex-col gap-y-1">
                  <div>Email: {offering.bus_email || "Not available"}</div>
                  <div>
                    Phone number:{" "}
                    {offering.bus_phone || "Not available"}
                  </div>
                  <div>{offering?.vendor.city}</div>
                </div>
                <SocialIcons offering={offering} />
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-2xl p-4 flex flex-col">
              <div className="mb-3 text-2xl font-bold">About the Vendor</div>
              <div>
                <p>{offering.vendor.about || "About not available"}</p>
              </div>
              <hr className="border-t border-gray-300 my-4" />

              <div className="mb-3 text-2xl font-bold">Details</div>
              <div>
                <p>{offering.description || "Description not available"}</p>
              </div>
              <hr className="border-t border-gray-300 my-4" />

              <div className="mb-3 text-2xl font-bold">Packages</div>
              <div>
                <p>{offering.pricing || "Pricing details not available"}</p>
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="mb-3 text-2xl font-bold">
                Reviews
              </div>
              <div>
                <Reviews serviceId={offering?.id} />
              </div>
              <div>
                <WriteReview serviceId={offering?.id} />
              </div>
              <div>
                <Comments serviceId={offering?.id} />
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="mb-3 text-2xl font-bold">
                Contact
              </div>
              <div className="flex flex-col gap-y-1">
                <div>Email: {offering.bus_email || "Email not available"}</div>
                <div>
                  Phone number:{" "}
                  {offering.bus_phone || "Phone number not available"}
                </div>
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="mb-3 text-2xl font-bold">
                Location
              </div>
              <div className="mb-3 text-2xl font-bold">
                <GoogleMapComponent serviceId={offering?.id} />
              </div>
            </div>
          </div>

          <div className="w-1/4">
            <div className="bg-white rounded-2xl p-4 flex flex-col sticky top-4">
              <p className="text-xl font-bold font-title mb-4">
                Message Vendor
              </p>
              <p className="text-xl font-bold font-title mb-4">Request Quote</p>
              <QuoteRequestWidget vendorId={offering?.vendor.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
"use client";

import Header from "@/components/shared/Headers/Header";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useParams } from "next/navigation";
import {
  FIND_MY_VENDOR_BY_ID,
  FIND_SERVICE_BY_ID,
  FIND_PACKAGES_BY_OFFERING,
} from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import SocialIcons from "@/components/vendor-dashboard/dahboard-services/socialIcons";
import { FiEdit } from "react-icons/fi";
import Reviews from "@/components/vendor-dashboard/dahboard-services/reviews/Reviews";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import Link from "next/link";
import LoaderQuantum from "@/components/shared/Loaders/LoaderQuantum";
import Comments from "@/components/vendor-dashboard/dahboard-services/reviews/Comments";
import WriteReview from "@/components/vendor-dashboard/dahboard-services/reviews/WriteReview";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { ADD_TO_MY_VENDORS, REMOVE_FROM_MY_VENDORS } from "@/graphql/mutations";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import QuoteRequestWidget from "@/components/chat/QuoteRequestWidget";
import GoogleMapComponent from "@/components/vendor-dashboard/dahboard-services/Map";
import PortfolioImages from "@/components/vendor-dashboard/dahboard-services/PortfolioImages";
import request from "@/utils/request";

// Add this constant at the top of the file with other imports
const LKR_TO_USD_RATE = 0.0031; // 1 LKR = 0.0031 USD (you should use real-time rates)

// Add this interface before the Service component
interface Package {
  id: string;
  name: string;
  description: string;
  pricing: number;
  features: string[];
  visible: boolean;
}

const Service: React.FC = () => {
  const { vendor } = useVendorAuth();
  const { visitor } = useAuth();
  const params = useParams();
  const { id } = params;
  // const router = useRouter();

  const { loading, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

  const queryError = useQuery(FIND_SERVICE_BY_ID, { variables: { id } }).error;

  const { data: packagesData } = useQuery(FIND_PACKAGES_BY_OFFERING, {
    variables: { offeringId: id },
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
  if (queryError) return <p>Error: {queryError.message}</p>;

  const offering = data?.findOfferingById;
  const isVendorsOffering = offering?.vendor.id === vendor?.id;

  const handleHeartClick = async () => {
    if (!visitor) {
      toast.error("Please login as a user to save to your vendors");
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
    } catch {
      toast.error("Couldn't save to your favorites");
    }
  };

  const handlePayAdvance = async (amount: number, packageId: string) => {
    try {
      if (!visitor) {
        toast.error("Please login as a user to pay advance");
        return;
      }

      // Convert LKR to USD and round to 2 decimal places
      const amountInUSD = Number((amount * LKR_TO_USD_RATE).toFixed(2));

      // Ensure minimum charge amount for Stripe (0.50 USD)
      if (amountInUSD < 0.5) {
        toast.error("Amount is too small for processing");
        return;
      }

      const { data } = await request.post(
        "/api/stripe/create-checkout-session",
        {
          amount: amountInUSD, // Send amount in USD
          packageId,
          visitorId: visitor.id,
          vendorId: offering.vendor.id,
          originalAmountLKR: amount, // Send original LKR amount for reference
        }
      );
      window.location.href = data.url;
    } catch {
      toast.error("Payment processing failed. Please try again.");
    }
  };

  return (
    <div className="bg-lightYellow font-body">
      <Header />
      <div className="container mx-auto justify-center py-2">
        <Link href="/vendor-dashboard">
          <button className="text-black font-body hover:text-gray-500 mr-2">
            &larr;
          </button>
          back
        </Link>

        {/* Replace the Portfolio Image Section with the new component */}
        <PortfolioImages
          banner={offering?.banner}
          photoShowcase={offering?.photo_showcase?.slice(0, 4) || []}
          hasMoreMedia={
            (offering?.photo_showcase && offering.photo_showcase.length > 4) ||
            offering?.video_showcase?.length > 0
          }
          totalMediaCount={
            (offering?.photo_showcase?.length || 0) +
            (offering?.video_showcase?.length || 0)
          }
          portfolioLink={`/services/${id}/gallery`}
        />

        {/* Add "See More" button if there are additional media items */}
        {((offering?.photo_showcase && offering.photo_showcase.length > 4) ||
          offering?.video_showcase?.length > 0) && (
          <div className="flex justify-center mt-2 mb-4"></div>
        )}

        <div className="flex flex-row gap-x-5 mt-4">
          <div className="w-3/4">
            {/* General Section */}
            <div className="bg-white rounded-2xl p-4 mb-4">
              <div className="flex flex-row">
                <div className="w-8/12 flex flex-col justify-between">
                  <div className="text-xl">
                    {offering?.vendor.busname || "Vendor name not available"}
                  </div>
                  <div className="flex flex-row text-3xl font-bold">
                    {offering?.name}
                    <div className="flex flex-row justify-center items-center">
                      {isVendorsOffering ? (
                        <Link href={`/services/edit/${offering?.id}`}>
                          <FiEdit className="text-2xl text-orange hover:text-black ml-1" />
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

              {/* Packages Section */}
              {packagesData?.findPackagesByOffering.some(
                (pkg: Package) => pkg.visible
              ) && (
                <>
                  <div className="mb-6 text-2xl font-bold">Packages</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {packagesData?.findPackagesByOffering
                      .filter((pkg: Package) => pkg.visible)
                      .map((pkg: Package) => (
                        <div
                          key={pkg.id}
                          className="bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden transition-all hover:shadow-lg"
                        >
                          <div className="p-4 text-center bg-gray-50 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800">
                              {pkg.name}
                            </h3>
                          </div>
                          <div className="p-6">
                            <div className="text-center mb-6">
                              <div className="text-3xl font-bold text-orange">
                                <span className="text-sm align-top text-gray-600">
                                  LKR
                                </span>{" "}
                                {pkg.pricing.toLocaleString()}
                              </div>
                              <p className="text-gray-600 mt-2">
                                {pkg.description}
                              </p>
                            </div>
                            <div className="space-y-3 mb-6 min-h-[100px]">
                              {pkg.features.map(
                                (feature: string, idx: number) => (
                                  <div key={idx} className="flex items-start">
                                    <svg
                                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span className="text-gray-700">
                                      {feature}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                              <button
                                onClick={() => {
                                  if (!visitor) {
                                    toast.error("Please login as a user to pay advance");
                                    return;
                                  }
                                  const advanceAmount: number =
                                    pkg.pricing * 0.2;
                                  handlePayAdvance(advanceAmount, pkg.id);
                                }}
                                className="w-full py-3 px-4 rounded-[22px] font-bold bg-orange text-white hover:bg-white hover:text-orange hover:border-2 hover:border-orange transition-colors flex flex-col items-center"
                              >
                                <span>Pay 20% Advance</span>
                                <span className="font-normal">
                                  LKR {(pkg.pricing * 0.2).toLocaleString()}
                                </span>
                                <div className="text-xs mt-1 opacity-80">
                                  ≈ $
                                  {(
                                    pkg.pricing *
                                    0.2 *
                                    LKR_TO_USD_RATE
                                  ).toFixed(2)}{" "}
                                  USD
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr className="border-t border-gray-300 my-6" />
                </>
              )}

              <div className="mb-3 text-2xl font-bold">Reviews</div>
              <div>
                <Reviews serviceId={offering?.id} />
              </div>

              {!isVendorsOffering ? (
                <div>
                  <WriteReview serviceId={offering?.id} />
                </div>
              ) : null}

              <div>
                <Comments serviceId={offering?.id} />
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="mb-3 text-2xl font-bold">Contact</div>
              <div className="flex flex-col gap-y-1">
                <div>Email: {offering.bus_email || "Email not available"}</div>
                <div>
                  Phone number:{" "}
                  {offering.bus_phone || "Phone number not available"}
                </div>
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="mb-3 text-2xl font-bold">Location</div>
              <div className="mb-3 text-2xl font-bold">
                <GoogleMapComponent serviceId={offering?.id} />
              </div>
            </div>
          </div>

          <div className="w-1/4 sticky top-20">
            <QuoteRequestWidget
              vendorId={offering?.vendor?.id}
              offeringId={
                typeof params.id === "string" ? params.id : params.id[0]
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

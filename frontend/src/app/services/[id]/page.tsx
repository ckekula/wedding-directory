"use client";

import Header from "@/components/shared/Headers/Header";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import { FIND_MY_VENDOR_BY_ID, FIND_SERVICE_BY_ID, FIND_PACKAGES_BY_OFFERING } from "@/graphql/queries";
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
import request from '@/utils/request';

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
  const router = useRouter();

  const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
    variables: { id },
  });

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
  if (error) return <p>Error: {error.message}</p>;

  const offering = data?.findOfferingById;
  const isVendorsOffering = offering?.vendor.id === vendor?.id;

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
    } catch {
      // console.error("Error saving to myVendors:", error);
      toast.error("Couldn't save to your favorites");
    }
  };

  const handlePayAdvance = async (amount: number, packageId: string) => {
    try {
      if (!visitor) {
        toast.error("Please login to pay advance");
        return;
      }

      const { data } = await request.post('/api/stripe/create-checkout-session', {
        amount,
        packageId,
        visitorId: visitor.id,
        vendorId: offering.vendor.id,
      });
      window.location.href = data.url;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Payment processing failed. Please try again.');
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
          photoShowcase={offering?.photo_showcase || []}
        />

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
              {packagesData?.findPackagesByOffering.some((pkg: Package) => pkg.visible) && (
                <>
                  <div className="mb-3 text-2xl font-bold">Packages</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packagesData?.findPackagesByOffering
                      .filter((pkg: Package) => pkg.visible)
                      .map((pkg: Package) => (
                        <div 
                          key={pkg.id} 
                          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                          <p className="text-gray-600 mb-4">{pkg.description}</p>
                          <div className="text-2xl font-bold text-orange mb-4">
                            ${pkg.pricing.toFixed(2)}
                          </div>
                          <ul className="space-y-2 mb-4">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <span className="text-orange mr-2">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => {
                              if (!visitor) {
                                toast.error("Please login to pay advance");
                                return;
                              }
                              const advanceAmount = pkg.pricing * 0.2; // Calculate 20% of the price
                              handlePayAdvance(advanceAmount, pkg.id);
                            }}
                            className="w-full bg-orange text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                          >
                            Pay 20% Advance (${(pkg.pricing * 0.2).toFixed(2)})
                          </button>
                        </div>
                      ))}
                  </div>
                  <hr className="border-t border-gray-300 my-4" />
                </>
              )}

              <div className="mb-3 text-2xl font-bold">
                Reviews
              </div>
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

          <div className="w-1/4 sticky top-20">
              <QuoteRequestWidget vendorId={offering?.vendor.id} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Service;
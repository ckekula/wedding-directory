"use client";

import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Stats from "@/components/vendor-dashboard/Stats";
import QuickActions from "@/components/vendor-dashboard/QuickActions";
import ToDo from "@/components/vendor-dashboard/ToDo";
import VendorResult from "@/components/vendor-search/VendorResult";
import Link from "next/link";
import { GET_VENDOR_BY_ID, FIND_PACKAGES_BY_VENDOR } from "@/api/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useQuery } from "@apollo/client";
import { CiCirclePlus } from "react-icons/ci";

const page = () => {

  const { vendor } = useVendorAuth();

  // Query to get vendor data
  const { data: vendorData, loading: vendorLoading, error: vendorError } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  // Query to get packages by vendor
  const { data: packagesData, loading: packagesLoading, error: packagesError } = useQuery(FIND_PACKAGES_BY_VENDOR, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  if (vendorLoading || packagesLoading) return <p>Loading vendor information...</p>;
  if (vendorError) return <p>Error loading vendor information: {vendorError.message}</p>;
  if (packagesError) return <p>Error loading packages: {packagesError.message}</p>;

  const vendorInfo = vendorData?.findVendorById;
  const packages = packagesData?.findPackagesByVendor || [];

  return (
    <div>
      <Header />

      <div className="bg-lightYellow">
        <div className="container mx-auto px-4">
          <h1 className="font-title text-[36px] text-black text-center py-4">Welcome</h1>

          {/* Vendor Banner */}
          <VendorBanner businessName={vendorInfo?.busname} />

          {/* City, Member Since, Rating */}
          <div className="grid grid-cols-3 text-center gap-10 mt-10 mb-8">
            <div className="flex flex-col justify-center items-center">
              <p className="font-body text-[20px]">City</p>
              <p className="font-body text-[15px]">{vendorInfo?.city}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-body text-[20px]">Member Since</p>
              <p className="font-body text-[15px]">{new Date(vendorInfo?.createdAt).getFullYear()}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-body text-[20px]">Rating</p>
              <p className="font-body text-[15px]">- / -</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center">
            <Stats />
          </div>

          {/* Quick Actions and To Do's */}
          <div className="flex justify-between py-12 gap-10">
            <QuickActions />
            <ToDo />
          </div>

          <hr className="border-t border-gray-300 my-4" />

          {/* Services Section */}
          <div className="flex flex-row mt-8">
            <div className="w-5/6 text-2xl font-bold mb-8">Your Services</div>
            <div className="w-1/6 ml-10">
              <Link href="/vendor-dashboard/new-service" className="flex items-center">
                <CiCirclePlus className="mr-2" />
                Add new Service
              </Link>
            </div>
          </div>

          {packages.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 overflow-x-auto">
              {packages.map((pkg: any) => (
                <VendorResult
                  key={pkg.id}
                  vendor={pkg.vendor?.busname}
                  name={pkg.name}
                  city={pkg.vendor?.city}
                  rating="4.5/5"
                  price="$$$"
                  about={pkg.about}
                  banner={"/banner.jpg"}
                  showStats={false}
                  buttonText="View details"
                  link={`/packages/${pkg.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="my-4 text-2xl">No packages found</div>
          )}

          <hr className="border-t border-gray-300 my-4" />

          <div className="text-2xl font-bold mb-8">Messages and Inquiries</div>
          <p className="mb-8">Coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoard;

"use client";

import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Stats from "@/components/vendor-dashboard/Stats";
import QuickActions from "@/components/vendor-dashboard/QuickActions";
import ToDo from "@/components/vendor-dashboard/ToDo";
import VendorService from "@/components/vendor-dashboard/ServiceResult"; // Import ServiceResult
import Link from "next/link";
import { GET_VENDOR_BY_ID } from "@/api/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useQuery } from "@apollo/client";
import { CiCirclePlus } from "react-icons/ci";

const VendorDashBoard = () => {

  const { vendor } = useVendorAuth();
  const { data, loading, error } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  if (loading) return <p>Loading vendor information...</p>;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  const vendorData = data?.findVendorById;

  return (
    <div>
      <Header />

      <div className="bg-lightYellow">
        <div className="container mx-auto px-4">
          {/* Adjusted the top margin and padding of the h1 */}
          <h1 className="font-title text-[36px] text-black text-center py-4">Welcome</h1>

          {/* Vendor Banner */}
          <VendorBanner businessName={ vendorData?.busname} />

          {/* City, Member Since, Rating */}
          <div className="grid grid-cols-3 text-center gap-10 mt-10 mb-8">
            <div className="flex flex-col justify-center items-center">
              <p className="font-body text-[20px]">City</p>
              <p className="font-body text-[15px]">{vendorData?.city}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-body text-[20px]">Member Since</p>
              <p className="font-body text-[15px]">{new Date(vendorData?.createdAt).getFullYear()}</p>
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

          {/* Render the ServiceResult component */}
          <div className="grid grid-cols-3 gap-6 overflow-x-auto">
            <VendorService
              vendor="John's Flower Shop"
              f_name="John"
              city="New York"
              rating="⭐ 4.9 (154)"
              price="$$-$$$"
              banner="/banner.jpg"
              description="We provide a wide range of flower arrangements for all occasions, including weddings, birthdays, and anniversaries."
              packages={[
                { category: "Florist", name: "Wedding Bouquet" },
                { category: "Florist", name: "Birthday Flowers" },
              ]}
            />
            {/* Add more ServiceResult components as needed */}
          </div>

          <hr className="border-t border-gray-300 my-4" />

          <div className="text-2xl font-bold mb-8">Messages and Inquiries</div>
          <p className="mb-8">Coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default page;

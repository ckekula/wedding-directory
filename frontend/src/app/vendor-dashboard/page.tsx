"use client";

import React from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
import Stats from "@/components/vendor-dashboard/Stats";
import OfferingCard from "@/components/vendor-search/OfferingCard";
import Link from "next/link";
import { GET_VENDOR_BY_ID, FIND_SERVICES_BY_VENDOR } from "@/graphql/queries";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useQuery } from "@apollo/client";
import { MdAdd } from "react-icons/md";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import LoaderJelly from "@/components/shared/Loaders/LoaderJelly";
import { Service } from "@/types/serviceTypes";
import { FiEdit } from "react-icons/fi";

const VendorDashBoard: React.FC = () => {
  const { vendor } = useVendorAuth();

  // Query to get vendor data
  const {
    data: vendorData,
    loading: vendorLoading,
    error: vendorError,
  } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  // Query to get services by vendor
  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useQuery(FIND_SERVICES_BY_VENDOR, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  if (vendorLoading || servicesLoading)
    return (
      <div>
        <p>Loading vendor information...</p>
        <LoaderJelly />
      </div>
    );
  if (vendorError)
    return <p>Error loading vendor information: {vendorError.message}</p>;
  if (servicesError)
    return <p>Error loading services: {servicesError.message}</p>;

  const vendorInfo = vendorData?.findVendorById;
  const services: Service[] = servicesData?.findOfferingsByVendor || [];

  return (
    <div>
      <Header />

      <div className="bg-lightYellow">
        <div className="container mx-auto px-4">
          <h1 className="font-title text-[36px] text-black text-center py-4">
            Welcome
          </h1>

          {/* Vendor Banner */}
          <VendorBanner businessName={vendorInfo?.busname} />

          {/* City, Member Since, Rating */}
          <div className="bg-white mt-4 rounded-lg shadow-lg flex items-center justify-center container">
            <div className="grid grid-cols-3 text-center gap-16 my-10">
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg mb-2">City</p>
                <p className="font-bold text-primary text-2xl">{vendorInfo?.city}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg mb-2">Member Since</p>
                <p className="font-bold text-primary text-2xl">
                  {new Date(vendorInfo?.createdAt).getFullYear()}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg mb-2">Rating</p>
                <p className="text-2xl font-bold text-primary ">4.8/5</p>
              </div>
            </div>
          </div>

          {/* Quick Actions and To Do's */}
          {/* <div className="flex justify-between py-12 gap-10">
            <QuickActions />
            <ToDo />
          </div> */}

          {/* About Section */}
          <div className="flex items-center mt-8 mb-8">
            <div className="text-2xl font-bold">
              About {vendorInfo?.busname}
            </div>
            <Link href="/vendor-dashboard/settings">
              <FiEdit className="text-2xl text-orange hover:text-black ml-4 cursor-pointer" />
            </Link>
          </div>
          <p className="font-body text-[16px]">
            {vendorInfo?.about || "About section not available"}
          </p>

          <hr className="border-t border-gray-300 my-4" />

          {/* Services Section */}
          <div className="flex flex-row mt-8">
            <div className="w-5/6 text-2xl font-bold mb-8">
              Services by {vendorInfo?.busname}
            </div>
            <div className="w-1/6 ml-10">
              <Link
                href="/vendor-dashboard/new-service"
                className="flex items-center"
              >
                <Button variant="signup">
                  <MdAdd className="mr-2" size={25} />
                  Add new Service
                </Button>
              </Link>
            </div>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 overflow-x-auto">
              {services.map((service: Service) => (
                <OfferingCard
                  key={service.id}
                  vendor={service.vendor?.busname || "Unknown"}
                  name={service.name}
                  city={service.vendor?.city || "Unknown"}
                  rating="4.8/5 (180)"
                  banner={"/images/banner.webp"}
                  buttonText="View details"
                  link={`/services/${service.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="my-4 text-2xl">No Services found</div>
          )}

          <hr className="border-t border-gray-300 my-4" />

          <div className="pb-8">
            <h2 className="text-2xl font-bold">Messages and Inquiries</h2>
            <p className="font-body py-8">Coming soon!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorDashBoard;

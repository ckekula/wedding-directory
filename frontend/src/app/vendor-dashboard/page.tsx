"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/shared/Headers/Header";
import VendorBanner from "@/components/vendor-dashboard/VendorBanner";
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
import QuickActions from "@/components/vendor-dashboard/QuickActions";
import ToDo from "@/components/vendor-dashboard/ToDo";

const VendorDashBoard: React.FC = () => {
  const { vendor } = useVendorAuth();
  const [services, setServices] = useState<Service[]>([]);

  const {
    data: vendorData,
    loading: vendorLoading,
    error: vendorError,
  } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useQuery(FIND_SERVICES_BY_VENDOR, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  // Update services state when servicesData changes
  useEffect(() => {
    if (servicesData?.findOfferingsByVendor) {
      setServices(servicesData.findOfferingsByVendor);
    }
  }, [servicesData]);

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

  return (
    <div className="bg-lightYellow">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <VendorBanner vendor={vendorInfo} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <QuickActions />
          <ToDo />
        </div>

        {/* About Section */}
        <div className="flex items-center mt-8 mb-8">
          <div className="text-2xl font-bold">About {vendorInfo?.busname}</div>
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
            <Link href="/vendor-dashboard/new-service" className="flex items-center">
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
                key={service?.id}
                vendor={service.vendor?.busname || "Unknown"}
                name={service?.name}
                city={service.vendor?.city || "Unknown"}
                rating={Number(service?.reviews?.[0]?.rating) || 0}
                banner={service.banner || "/images/offeringPlaceholder.webp"}
                buttonText="View details"
                link={`/services/${service.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="my-4 text-2xl">No Services found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VendorDashBoard;

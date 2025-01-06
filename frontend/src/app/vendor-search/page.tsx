"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";
import VendorResult from "@/components/vendor-search/VendorResult";
import { Button } from "@/components/ui/button";
import { FIND_SERVICES } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import FilterSearchBar from "@/components/vendor-search/FilterSearchBar";
import { Service } from '@/types/serviceTypes';

const VendorSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [getServices, { loading, data, error }] = useLazyQuery(FIND_SERVICES);

  // Execute query on page load (no filters)
  useEffect(() => {
    getServices();
  }, [getServices]);

  const handleSearch = () => {
    getServices({
      variables: {
        filter: {
          city: city || null,
          category: category || null,
        },
      },
    });
  };

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <div className="bg-lightYellow font-title">
      <Header />
      <div className="mt-4 mb-6">
        <h2 className="mx-4 md:mx-20 text-3xl text-center font-bold mb-1">
          Find the perfect crew for your wedding
        </h2>
        <h2 className="mx-4 md:mx-20 text-xl text-center mb-6">
          Filter by Category and Location
        </h2>
      </div>

      <FilterSearchBar
        handleSearch={handleSearch}
        onCityChange={handleCityChange}
        onCategoryChange={handleCategoryChange}
      />
      <hr className="w-full h-px my-4 bg-slate-900 border-2 container" />

      <div className="flex flex-row mx-4 md:mx-8 px-2 md:px-4">
        <div className="relative w-full m-3 md:w-3/4 h-full md:h-auto rounded-2xl overflow-hidden">
          <div className="flex flex-row space-x-4">
            <Button className="bg-white text-black hover:bg-gray-300">
              Distance
            </Button>
            <Button className="bg-white text-black hover:bg-gray-300">
              Price
            </Button>
            <Button className="bg-white text-black hover:bg-gray-300">
              Ratings
            </Button>
            <Button className="bg-white text-black hover:bg-gray-300">
              Featured
            </Button>
          </div>

          {loading && <div className="my-4 text-2xl">Loading...</div>}
          {error && <div className="my-4 text-2xl">Error: {error.message}</div>}

          {!loading && data && data.findOfferings.length > 0 ? (
            <>
              <div className="my-4 text-2xl">
                Found {data.findOfferings.length} vendors
              </div>
              <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 overflow-x-auto">
                {data.findOfferings.map((service: Service) => (
                  <VendorResult
                    key={service.id}
                    name={service.name}
                    vendor={service.vendor?.busname || "N/A"}
                    city={service.vendor?.city || "N/A"}
                    banner="/images/photography.webp"
                    rating="⭐ 4.9 (154)" // Customize the rating
                    price="$$-$$$" // Customize the price
                    about={service.description}
                    showStats={true}
                    buttonText="View Details"
                    link={`/services/${service.id}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="my-4 text-2xl">No vendors found</div>
          )}
        </div>

        <div className="relative hidden xl:block w-full m-3 md:w-1/4 h-full md:h-auto rounded-2xl bg-white overflow-hidden">
          <p className="text-center my-6 font-bold">Other Vendors You might like</p>
          <p className="text-center">Nothing to show yet</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorSearch;

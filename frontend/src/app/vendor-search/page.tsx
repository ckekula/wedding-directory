"use client";

import React, { useState, useCallback, useEffect } from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";
import OfferingCard from "@/components/vendor-search/OfferingCard";
// import { Button } from "@/components/ui/button";
import { FIND_SERVICES } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import FilterSearchBar from "@/components/vendor-search/FilterSearchBar";
import { Offering } from '@/types/offeringTypes';
import LoaderJelly from "@/components/shared/Loaders/LoaderJelly";
import Chatbot from "@/components/ai/chatbot";

const VendorSearch: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // useLazyQuery hook to fetch services on demand
  const [getServices, { loading, data, error }] = useLazyQuery(FIND_SERVICES);

  // Trigger search when the button is clicked or filters change
  const handleSearch = useCallback(() => {
    if (getServices) {
      getServices({
        variables: {
          filter: {
            city: city || null,
            category: category || null,
          },
        },
      });
    } else {
      console.error("getServices is not initialized");
    }
  }, [city, category, getServices]);

    // Load initial data when component mounts
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Handlers for filter changes
  const handleCityChange = useCallback((newCity: string) => {
    setCity(newCity);
  }, []);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);

  return (
    <div className="bg-lightYellow font-title">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8">
        <h2 className="text-3xl text-center font-bold">
          Find the perfect crew for your wedding
        </h2>
        <h2 className="mx-4 md:mx-20 text-xl text-center mb-2">
          Filter by Category and Location
        </h2>
      </div>

      <FilterSearchBar
        handleSearch={handleSearch}
        onCityChange={handleCityChange}
        onCategoryChange={handleCategoryChange}
      />
      <hr className=" h-px my-4 bg-black border-[1.5px] container" />

      <div className="flex flex-row container mx-auto px-4">
        {/* Main Content */}
        <div className="relative w-full m-3 md:w-3/4 h-full md:h-auto rounded-2xl overflow-hidden">
          {/* Sorting Options */}
          {/* <div className="flex flex-row space-x-4">
            <Button className="bg-white text-black hover:bg-gray-300">Distance</Button>
            <Button className="bg-white text-black hover:bg-gray-300">Price</Button>
            <Button className="bg-white text-black hover:bg-gray-300">Ratings</Button>
            <Button className="bg-white text-black hover:bg-gray-300">Featured</Button>
          </div> */}

          {/* Data Loading/Error/Result State */}
          {loading ? (
            <LoaderJelly />
          ) : error ? (
            <div className="my-4 text-2xl">Oops! We went to a trouble. Please try again after few minutes. :(</div>
          ) : data?.findOfferings?.filter((offering: Offering) => offering.visible)?.length > 0 ? (
            <div>
              <div className="my-4 text-2xl">
                Found {data.findOfferings.filter((offering: Offering) => offering.visible).length} vendors
              </div>
              <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 overflow-x-auto">
                {data.findOfferings
                  .filter((offering: Offering) => offering.visible)
                  .map((offering: Offering) => (
                    <OfferingCard
                      key={offering.id}
                      name={offering.name}
                      vendor={offering.vendor?.busname || "N/A"}
                      city={offering.vendor?.city || "N/A"}
                      banner={offering.banner || "/images/offeringPlaceholder.webp"}
                      rating={offering.reviews.length > 0 
                        ? (offering.reviews.reduce((acc, review) => acc + Number(review.rating), 0) / offering.reviews.length)
                        : 0
                      }
                      buttonText="View Details"
                      link={`/services/${offering.id}`}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="my-4 text-xl">No vendors found</div>
          )}
        </div>

        {/* Sidebar */}
        <div className="relative hidden xl:block w-full m-3 md:w-1/4 h-full md:h-auto rounded-2xl bg-white overflow-hidden">
          <p className="text-center my-6 font-bold mx-2">Vendors you might like based on your favorites</p>
          <p className="text-center">Nothing to show yet!</p>
        </div>
      </div>
      <Chatbot/>
      <Footer />
    </div>
  );
};

export default VendorSearch;

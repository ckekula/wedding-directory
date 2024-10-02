'use client';

import React, { useState } from 'react'
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";

import VendorResult from '@/components/vendor-search/VendorResult';
import { Button } from '@/components/ui/button';
import { IoIosSearch } from "react-icons/io";
import OtherVendor from "@/components/vendor-search/OtherVendor";
import CityInput from '@/components/vendor-signup/CityInput';
import CategoryInput from '@/components/vendor-signup/CategoryInput';
import { FIND_VENDORS_WITH_FILTERS } from '@/api/graphql/queries';
import { useLazyQuery } from '@apollo/client';

const handleCityChange = (city: string) => {
    
}

const handleCategoryChange = (category: string) => {
    
}

const VendorSearch = () => {

    const [filters, setFilters] = useState({
        city: '',
        category: ''
    });

    const [getVendors, { loading, data, error }] = useLazyQuery(FIND_VENDORS_WITH_FILTERS);
    
    const handleSearch = () => {
        getVendors({
          variables: {
            filters,
          },
        });
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
          ...filters,
          [e.target.name]: e.target.value,
        });
      };

    return (
        <div className='bg-background font-title'>
            <Header />
            <div className='mt-4 mb-6'>
                <h2 className="mx-40 text-3xl text-center font-bold mb-1">Find the perfect crew for your wedding</h2>
                <h2 className="mx-40 text-xl text-center mb-6">Search by  Category and Location</h2>
            </div>

            <div className='flex flex-row h-12 justify-center align-middle'>
                <div className="border-black border-2 rounded-lg w-44 border-solid bg-white ">
                    <CityInput onCityChange={handleCityChange}/>
                </div>

                <div className="border-black border-2 -ml-2 w-44 border-solid bg-white z-10">
                    <CategoryInput onCategoryChange={handleCategoryChange}/>
                </div>
                <div className="bg-orange w-14 h-12 -ml-2 rounded-lg text-2xl text-white flex items-center justify-center">
                    <IoIosSearch />
                </div>


            </div>

            <div className='flex flex-row mx-16 px-10'>
                <div className="relative w-full m-3 md:w-3/4 h-full md:h-auto rounded-2xl overflow-hidden">
                    <div className='flex flex-row space-x-4'>
                        <Button className="bg-white text-black hover:bg-gray-300">Distance</Button>
                        <Button className="bg-white text-black hover:bg-gray-300">Price</Button>
                        <Button className="bg-white text-black hover:bg-gray-300">Ratings</Button>
                        <Button className="bg-white text-black hover:bg-gray-300">Featured</Button>
                    </div>

                    <div className='my-4 text-2xl'>Found 30 Wedding photographers in Nuwara Eliya
                    </div>

                    <div className='flex flex-row space-x-6 overflow-x-auto'>
                        <VendorResult />
                        <VendorResult />
                        <VendorResult />
                    </div>


                </div>

                <div className="relative w-full m-3 md:w-1/4 h-full md:h-auto rounded-2xl bg-white overflow-hidden">
                    <p className='text-center mt-4 mb-6 font-bold'>Other Photographers You might like</p>
                    <OtherVendor />
                    <OtherVendor />
                    <OtherVendor />
                </div>

            </div>
            <Footer />

        </div>
    )
}

export default VendorSearch;

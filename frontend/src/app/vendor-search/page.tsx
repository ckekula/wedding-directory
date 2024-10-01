import React from 'react'
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";
import SearchBar from '@/components/shared/SearchBar';
import vendor from '@/components/vendor-search/VendorResult'
import VendorResult from '@/components/vendor-search/VendorResult';
import { Button } from '@/components/ui/button';

const page = () => {
    return (
        <div className='bg-background font-title'>
            <Header />
            <div className='mt-4 mb-6'>
                <h2 className="mx-40 text-3xl text-center font-bold mb-6 ">Find the perfect crew for your wedding</h2>
            </div>
            <div>
                <SearchBar />
            </div>
            <div className='flex flex-row mx-16 px-10'>
                <div className="relative w-full m-3 md:w-3/4 h-full md:h-auto rounded-2xl overflow-hidden">
                    <div className='flex flex-row space-x-4'>
                        <Button>Distance</Button>
                        <Button>Price</Button>
                        <Button>Ratings</Button>
                        <Button>Featured</Button>
                    </div>

                    <div className='mt-4 text-2xl'>Found 30 Wedding photographers in Nuwara Eliya
                    </div>

                    <div className='flex flex-row space-x-6 overflow-x-auto'>
                        <VendorResult />
                        <VendorResult />
                        <VendorResult />
                    </div>


                </div>

                <div className="relative w-full m-3 mt-16 md:w-1/4 h-full md:h-auto rounded-2xl bg-white overflow-hidden">

                    <p className='text-center mt-4 font-bold'>Other Photographers You might like</p>
                    
                    
                </div>

            </div>
            <Footer/>

        </div>
    )
}

export default page

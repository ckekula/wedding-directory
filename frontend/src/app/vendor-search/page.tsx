import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from 'react'
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";
import SearchBar from '@/components/shared/SearchBar';
import vendor from '@/components/vendor-search/VendorResult'
import VendorResult from '@/components/vendor-search/VendorResult';
import { Button } from '@/components/ui/button';
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import OtherVendor from "@/components/vendor-search/OtherVendor";

const page = () => {
    return (
        <div className='bg-background font-title'>
            <Header />
            <div className='mt-4 mb-6'>
                <h2 className="mx-40 text-3xl text-center font-bold mb-1">Find the perfect crew for your wedding</h2>
                <h2 className="mx-40 text-xl text-center mb-6">Search by  Category and Location</h2>
            </div>

            <div className='flex flex-row h-12 justify-center align-middle'>
                <div className="border-black border-2 rounded-lg w-44 border-solid bg-white ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="rounded-md border-2 flex flex-col w-full border-solid h-full ">
                                <Button className="rounded-none hover:bg-white w-full h-full bg-white text-black " >Category <RiArrowDropDownLine /></Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Category </DropdownMenuLabel>
                            <DropdownMenuGroup>
                                Photography
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu></div>

                <div className="border-black border-2 -ml-2 w-44 border-solid bg-white z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="rounded-md border-2 flex flex-col w-full border-solid h-full ">
                                <Button className="rounded-none hover:bg-white w-full h-full bg-white text-black " >Location <RiArrowDropDownLine /></Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Category </DropdownMenuLabel>
                            <DropdownMenuGroup>
                                Photography
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
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

export default page

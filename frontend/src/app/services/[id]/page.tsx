"use client";

import Header from '@/components/shared/Headers/Header'
import React from 'react'
import { CiStar, CiBookmark } from "react-icons/ci";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { FIND_SERVICE_BY_ID } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import SocialIcons from '@/components/vendor-dashboard/dahboard-services/socialIcons';
import { FiEdit } from "react-icons/fi";
import Reviews from '@/components/vendor-dashboard/dahboard-services/reviews';
import { useVendorAuth } from '@/contexts/VendorAuthContext';
import Link from 'next/link';
import LoaderQuantum from '@/components/shared/Loaders/LoaderQuantum';

const Service: React.FC = () => {

    const {vendor} = useVendorAuth();
    const params = useParams();
    const { id } = params;

    const { loading, error, data } = useQuery(FIND_SERVICE_BY_ID, {
        variables: { id },
    });

    if (loading) return <LoaderQuantum/>;
    if (error) return <p>Error: {error.message}</p>;

    const service = data?.findOfferingById;
    const portfolioImages = service.photo_showcase || ["/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp",
    "/images/photography.webp"];

    console.log(portfolioImages)

    return (
        <div className='bg-lightYellow font-body'>
            <Header />
            <div className='mx-40 my-4 p-4'>

                <Link href="/vendor-dashboard">
                    <button className=" text-black font-body hover:text-gray-500 mr-2">
                        &larr;
                    </button>
                    back
                </Link>
                <div>
                    <section >

                        <div className="container mx-auto">
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-1 space-y-1 p-4">
                                {portfolioImages.map((photo: string, index: number) => (
                                    <div
                                    key={index}
                                        className="relative group overflow-hidden rounded-lg break-inside-avoid"
                                    >
                                        <Image
                                            src={photo}
                                            alt=''
                                            className="w-full h-full object-cover"
                                            layout="responsive"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                <div >
                    <div className='bg-white rounded-2xl p-4 mb-4'>
                        <div className='flex flex-row'>
                            <div className='w-8/12 flex flex-col'>
                                <p>{service?.vendor.busname || "Vendor name not available"}</p>
                                <div className='flex flex-row text-2xl font-bold'>
                                    {service?.name}
                                    <div className='ml-2 flex flex-row justify-center items-center gap-x-1'>
                                    {service?.vendor.id === vendor?.id ? (
                                            <Link href={`/services/edit/${service?.id}`}>
                                              <FiEdit />
                                            </Link>  // Show the edit icon if the logged-in user is the vendor
                                        ) : (
                                            <CiBookmark /> // Show the heart icon otherwise
                                        )}
                                    </div>
                                </div>
                                <div className=' flex flex-row items-center text-lg'>
                                    <CiStar /><CiStar /><CiStar /><CiStar /><CiStar /><span>  -/-(0)</span>
                                </div>
                                <div className=''>
                                    {service?.vendor.city}
                                </div>
                            </div>
                            
                            <SocialIcons service={service} />
                        </div>
                    </div>

                    <div className='flex flex-row gap-x-5'>
                        <div className='bg-white rounded-2xl w-3/4 p-4 flex flex-col '>
                            <div className='mb-3 text-2xl font-bold font-title'>
                                About the Vendor
                            </div>
                            <div>
                                <p>{service.vendor.about || "About section not available"}</p>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />

                            <div className='mb-3 text-2xl font-bold'>
                                Details
                            </div>
                            <div>
                                <p>{service.description || "Description not available"}</p>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />

                            <div className='mb-3 text-2xl font-bold font-title'>
                                Pricing
                            </div>
                            <div>
                                <p>{service.pricing || "Pricing details not available"}</p>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />
                            <div className='mb-3 text-2xl font-bold font-title'>
                                Reviews
                            </div>
                            <div className='flex flex-row'>
                                <div className='w-1/2'>
                                    <p>Not available right now</p>
                                </div>
                                <Reviews />
                            </div>
                            <hr className="border-t border-gray-300 my-4" />
                            <div className='mb-3 text-2xl font-bold font-title'>
                                Contact
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div>Email: {service.bus_email || "Email not available"}</div>
                                <div>Phone number: {service.bus_phone || "Phone number not available"}</div>
                            </div>
                        </div>
                        <div className='bg-white rounded-2xl w-1/4 p-4 text-xl font-bold font-title'>
                            Message Vendor
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;

"use client";

import Header from '@/components/shared/Headers/Header'
import React from 'react'
import { CiStar, CiHeart, CiTwitter } from "react-icons/ci";
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { GoGlobe } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { CgLoadbar } from "react-icons/cg";
import { IoMdShare } from "react-icons/io";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { FIND_PACKAGE_BY_ID } from '../../../api/graphql/queries';
import { useQuery } from '@apollo/client';

const mediaURLs = ["/photography.jpg",
    "/photography.jpg",
    "/photography.jpg",
    "/photography.jpg",
    "/photography.jpg",
    "/photography.jpg"
]

const Package: React.FC = () => {

    const params = useParams();
    const { id } = params;

    const { loading, error, data } = useQuery(FIND_PACKAGE_BY_ID, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const pkg = data?.findPackageById;

    return (
        <div className='bg-lightYellow font-body'>
            <Header />
            <div className='mx-40 my-4 p-4'>

                <div>
                    <button className=" text-black font-body hover:text-gray-500 mr-2">
                        &larr;
                    </button>
                    back
                </div>
                <div>
                    <section >

                        <div className="container mx-auto">
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-1 space-y-1 p-4">
                                {mediaURLs.map((photo) => (
                                    <div
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
                                <p>{pkg?.vendor.busname}</p>
                                <div className='flex flex-row text-2xl font-bold'>
                                    {pkg?.name}
                                    <div className='ml-2 flex flex-row justify-center items-center gap-x-1'>
                                        <CiHeart />
                                        <IoMdShare />
                                    </div>
                                </div>
                                <div className=' flex flex-row items-center text-lg'>
                                    <CiStar /><CiStar /><CiStar /><CiStar /><CiStar /><span>  -/-(0)</span>
                                </div>
                                <div className=''>
                                    {pkg?.vendor.city}
                                </div>
                            </div>
                            <div className='w-4/12 flex flex-row text-2xl items-center justify-end gap-x-4 mr-3'>
                                <div
                                    onClick={() => window.open(pkg?.website, '_blank')}
                                    className='cursor-pointer'
                                    title="Visit Website"
                                >
                                    <GoGlobe />
                                </div>
                                <div
                                    onClick={() => window.open(pkg?.facebook, '_blank')}
                                    className='cursor-pointer'
                                    title="Visit Facebook Page"
                                >
                                    <SlSocialFacebook />
                                </div>
                                <div
                                    onClick={() => window.open(pkg?.instagram, '_blank')}
                                    className='cursor-pointer'
                                    title="Visit Instagram Page"
                                >
                                    <SlSocialInstagram />
                                </div>
                                <div
                                    onClick={() => window.open(pkg?.x, '_blank')}
                                    className='cursor-pointer'
                                    title="Visit X Page"
                                >
                                    <CiTwitter />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-row gap-x-5'>
                        <div className='bg-white rounded-2xl w-3/4 p-4 flex flex-col '>
                            <div className='mb-3 text-2xl font-bold font-title'>
                                About this vendor
                            </div>
                            <div>
                            {pkg?.about}
                            </div>
                            <hr className="border-t border-gray-300 my-4" />

                            <div className='mb-3 text-2xl font-bold'>
                                Details
                            </div>
                            <div>
                                Business Attributes
                                MC Services
                                Recorded Music
                                Sound Equipment
                            </div>
                            <hr className="border-t border-gray-300 my-4" />
                            <div className='mb-3 text-2xl font-bold font-title'>
                                Pricing
                            </div>
                            <div>
                                <p>$$$ - Moderate</p>
                                <p>Want to know more? Ask about pricing</p>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />
                            <div className='mb-3 text-2xl font-bold font-title'>
                                Reviews
                            </div>
                            <div className='flex flex-row'>
                                <div className='w-1/2'>
                                    <p>5 out of 5</p>
                                    <p>From 49 reviews</p>
                                </div>
                                <div className='w-1/2 flex flex-col'>
                                    <div className='flex items-center'>
                                        <span className='mr-2'>5 Stars</span>
                                        <CgLoadbar className='mx-4' />
                                        <span>100%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mr-2'>4 Stars</span>
                                        <CgLoadbar className='mx-4' />
                                        <span>100%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mr-2'>3 Stars</span>
                                        <CgLoadbar className='mx-4' />
                                        <span>100%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mr-2'>2 Stars</span>
                                        <CgLoadbar className='mx-4' />
                                        <span>100%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mr-3'>1 Star</span>
                                        <CgLoadbar className='mx-4' />
                                        <span>100%</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />
                            <div className='mb-3 text-2xl font-bold font-title'>
                                Contact
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div>Address: Nuwara Eliya</div>
                                <div> Phone: 01xxxxxxxx</div>
                                <div className='w-4/12 mt-2 flex flex-row text-2xl items-start gap-x-4 mr-3'>
                                    <SlSocialFacebook />
                                    <SlSocialInstagram />
                                    <GoGlobe />
                                    <FiPhoneCall />
                                </div>
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

export default Package;

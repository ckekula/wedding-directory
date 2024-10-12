import Header from '@/components/shared/Headers/Header'
import React from 'react'
import { CiStar, CiHeart } from "react-icons/ci";
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { GoGlobe } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { CgLoadbar } from "react-icons/cg";
import { IoMdShare } from "react-icons/io";
import Image from "next/image";
import { useParams } from 'next/navigation';

const photos = ["/photography.jpg",
    "/photography.jpg",
    "/photography.jpg",
    "/photography.jpg",
    "/photography.jpg",
    "/photography.jpg"
]

const Packages = ({ packageData }) => {

    const params = useParams();
    const { id } = params;



    return (
        <div className='bg-lightYellow font-body'>
            <Header />
            <div className='mx-40 my-4 p-4'>

                <div className='mb-2'>
                    <button className=" text-black font-body hover:text-gray-500 mr-2">
                        &larr;
                    </button>
                    Wedding Photographers in Nuwara Eliya
                </div>
                <div>
                    <section >

                        <div className="container mx-auto">
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
                                {photos.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className="relative group overflow-hidden rounded-lg break-inside-avoid"
                                    >
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
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
                                <div className='flex flex-row text-2xl font-bold'>
                                    John&apos;s Flower Shop
                                    <div className='ml-2 flex flex-row justify-center items-center gap-x-1'>
                                        <CiHeart />
                                        <IoMdShare />
                                    </div>
                                </div>
                                <div className=' flex flex-row items-center text-lg'>
                                    <CiStar /><CiStar /><CiStar /><CiStar /><CiStar /> 5(42)
                                </div>
                                <div className=''>
                                    Nuwara Eliya
                                </div>
                            </div>
                            <div className='w-4/12 flex flex-row text-2xl items-center justify-end gap-x-4 mr-3'>
                                <SlSocialFacebook />
                                <SlSocialInstagram />
                                <GoGlobe />
                                <FiPhoneCall />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row gap-x-5'>
                        <div className='bg-white rounded-2xl w-3/4 p-4 flex flex-col '>
                            <div className='mb-3 text-2xl font-bold font-title'>
                                About this vendor
                            </div>
                            <div className='mb-3'>
                                A Full Service DJ Network & Production Company
                            </div>
                            <div>
                                4AM is a full service talent management and event production company  based in NYC, servicing clients globally. Since 2010, we have provided  dynamic DJ talent for nightclubs to fashion houses, creative and PR  agencies, sports and luxury brands, and of course, wedding and private  event hosts! Our clients include BMW, Belvedere, Kate Spade, Netflix,  Nike, Paris Hilton, Tony Awards, Viacom, and W Hotels - to name a few.  We have a large network of DJ talent and Instrumentalists that fit all  styles and price points, accompanied by a production arm that can take  care of anything from your basic equipment and sound set ups, to custom  booths, lighting, staging, and beyond.
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

export default Packages;

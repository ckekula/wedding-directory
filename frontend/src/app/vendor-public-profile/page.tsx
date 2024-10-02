import Header from '@/components/shared/Headers/Header'
import React from 'react'
import { CiStar, CiHeart } from "react-icons/ci";
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { GoGlobe } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";

const VendorPublicProfile = () => {
    return (
        <div className='bg-lightYellow'>
            <Header />
            <div >
                <div>
                    Wedding Photographers in Nuwara Eliya
                </div>
                <div className='mx-40 my-4 p-4'>
                    <div className='bg-white rounded-2xl p-4 mb-4'>
                        <div className='flex flex-row'>
                            <div className='w-8/12 flex flex-col'>
                                <div className='flex flex-row text-2xl font-bold'>
                                    John&apos;s Flower Shop
                                    <div className='ml-1 flex flex-row items-center '>
                                        <CiHeart />
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
                            <div className='text-2xl font-bold'>
                                About this vendor
                            </div>
                            <div className='mb-3'>
                                A Full Service DJ Network & Production Company
                            </div>
                            <div>
                                4AM is a full service talent management and event production company  based in NYC, servicing clients globally. Since 2010, we have provided  dynamic DJ talent for nightclubs to fashion houses, creative and PR  agencies, sports and luxury brands, and of course, wedding and private  event hosts! Our clients include BMW, Belvedere, Kate Spade, Netflix,  Nike, Paris Hilton, Tony Awards, Viacom, and W Hotels - to name a few.  We have a large network of DJ talent and Instrumentalists that fit all  styles and price points, accompanied by a production arm that can take  care of anything from your basic equipment and sound set ups, to custom  booths, lighting, staging, and beyond.
                                <hr className="border-t border-gray-300 my-4" />;
                                At 4AM, we believe that music is the most important piece of the party  puzzle. We have years of experience working in the events and  hospitality industry, including extensive weddings and social events. We aim to eliminate the ambiguity and stress that often comes with  planning your special event by providing transparency, clear  communication, and a thoughtful 360-degree approach to curating the  soundscape. Our team is positioned to deliver top tier music services  while making the full experience enjoyable and seamless.
                              </hr>
                            </div>
                        </div>
                        <div className='bg-white rounded-2xl w-1/4 p-4 text-xl font-bold'>
                            Message Vendor
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default VendorPublicProfile

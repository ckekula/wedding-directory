import React from 'react'
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { GoGlobe } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";
import { SocialTypes } from '@/types/offeringTypes';

const SocialIcons = ({offering}: { offering: SocialTypes }) => {
  return (
    
        <div className='flex flex-row text-2xl items-center justify-end gap-x-4'>
            <div
                onClick={() => {
                    if(offering?.website) {
                        window.open(offering.website, '_blank')
                    }
                }}
                className='cursor-pointer'
                title="Visit Website"
            >
                <GoGlobe className=" hover:text-orange"/>
            </div>
            <div
                onClick={() => {
                    if (offering?.facebook) {
                        window.open(offering.facebook, '_blank');
                    }
                }}
                className='cursor-pointer'
                title="Visit Facebook Page"
            >
                <SlSocialFacebook className=" hover:text-orange"/>
            </div>
            <div
                onClick={() => {
                    if (offering?.instagram) {
                        window.open(offering.instagram, '_blank');
                    }}
                }
                className='cursor-pointer'
                title="Visit Instagram Page"
            >
                <SlSocialInstagram className=" hover:text-orange"/>
            </div>
            <div
                onClick={() => {
                    if (offering?.x) {
                        window.open(offering.x, '_blank');
                    }}
                }
                className='cursor-pointer'
                title="Visit X Page"
            >
                <FaXTwitter className=" hover:text-orange"/>
            </div>
        </div>
    
  )
}

export default SocialIcons
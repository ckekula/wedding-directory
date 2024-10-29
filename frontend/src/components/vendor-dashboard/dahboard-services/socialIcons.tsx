import React from 'react'
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { GoGlobe } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcons = (service: any) => {
  return (
    
        <div className=' flex flex-row text-2xl items-center justify-end gap-x-4 container'>
            <div
                onClick={() => window.open(service?.website, '_blank')}
                className='cursor-pointer'
                title="Visit Website"
            >
                <GoGlobe className=" hover:text-orange"/>
            </div>
            <div
                onClick={() => window.open(service?.facebook, '_blank')}
                className='cursor-pointer'
                title="Visit Facebook Page"
            >
                <SlSocialFacebook className=" hover:text-orange"/>
            </div>
            <div
                onClick={() => window.open(service?.instagram, '_blank')}
                className='cursor-pointer'
                title="Visit Instagram Page"
            >
                <SlSocialInstagram className=" hover:text-orange"/>
            </div>
            <div
                onClick={() => window.open(service?.x, '_blank')}
                className='cursor-pointer'
                title="Visit X Page"
            >
                <FaXTwitter className=" hover:text-orange"/>
            </div>
        </div>
    
  )
}

export default SocialIcons
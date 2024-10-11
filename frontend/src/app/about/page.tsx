import React from 'react'
import Image from "next/image";
import Header from '@/components/shared/Headers/Header';
import Footer from '@/components/shared/Footer';

const page = () => {
  return (
    <div className='bg-lightYellow font-body'>
      <Header />
      <div className='mx-10 '>
        <div className="relative z-10 w-10/12 h-[1000px] md:h-[300px] mx-auto flex justify-center items-center ">
          <div className="absolute inset-0 border-solid rounded-md">
            <Image
              src='/photography.jpg'
              layout="fill"
              objectFit="cover"
              alt="sign image"
            />
          </div>
        </div>
        <div className='mx-28 mt-4 bg-white rounded-lg py-5 px-6 mb-3'>
          <div className='font-title font-bold text-3xl'>About Us</div>
          <div className='mt-3'> In 16+ countries across North America, Europe, Latin America and Asia, The Knot Worldwide champions the power of celebration. The company’s global family of brands provide best-in-class products, services and content to take celebration planning from inspiration to action. At the core of The Knot Worldwide business is our industry-leading global online wedding Vendor Marketplace, connecting couples with local wedding professionals and a comprehensive suite of personalized wedding websites, planning tools, invitations and registry services that make wedding planning easier for couples around the globe. Each year, The Knot Worldwide connects 4 million+ couples with nearly 850,000 vendors within its global wedding Marketplace.</div>
          <div className='flex flex-row  mt-6'>
            <div className='w-1/2 pr-4 '>
            <div className='font-bold font-title text-xl mb-1'>Our Purpose</div>
            <p>Our purpose is to enable everyone to celebrate the moments that make us.</p>
            </div>
            <div className='w-1/2 pr-4 '>
            <div className='font-bold font-title text-xl mb-1'>Our Vision</div>
            <p>Our vision is to ensure everyone around the world is empowered to create celebrations that are authentic to them for the moments most important to them.</p>
            </div>
             </div>
          </div>
        </div>
        <Footer/>
        </div>
  )
}

export default page
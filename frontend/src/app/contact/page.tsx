import Header from '@/components/shared/Headers/Header'
import React from 'react'
import Image from "next/image";
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
          <div className='font-title font-bold text-3xl'>Contact Us</div>
          <div className='font-title font-bold text-2xl mt-3'>Say I Do</div>
          <div className='gap-y-2 flex flex-col mt-4'>For help with your Wedding Website, Registry, or with general support questions about SayIDo.com
            <div className='font-bold mt-4'>Email:</div>
            <div >help@sayido.com</div>
             <div className='mt-4 font-bold'>Customer Service Hours:</div>
              <div>10:00 AM to 6:00 PM (EST)</div>
              <div>Monday-Friday (excluding holidays)</div>
              <div className='mt-4'>Need help? LiveChat is available</div>
              <div className='font-bold'>Email:</div>
              <div>sayido@weddings.com</div>
            
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default page
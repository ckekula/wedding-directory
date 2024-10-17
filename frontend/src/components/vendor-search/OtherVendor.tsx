import Image from 'next/image'
import React from 'react'


const OtherVendor = () => {
  return (
    <div className="flex justify-center">
    <div className="flex justify-left items-start mb-2 rounded-2xl w-72 cursor-pointer m-0 p-0">
      <div className="flex flex-row m-1 p-1 items-center">
        <Image
          src="/images/photography.jpg"
          alt="invi"
          className="object-cover rounded-md w-16 h-16" 
          width={64}   
          height={64}  
        />
        <div className="ml-3">
          
          <h3 className="mb-1">Example Photographers</h3>

          <div className="text-xs mb-1">⭐ 4.9 (154) </div>
          <div className="text-sm">$$ - $$$</div>
        </div>
      </div>
    </div>
  </div>
  

  
  )
}

export default OtherVendor

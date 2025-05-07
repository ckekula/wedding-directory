import { Button } from '@/components/ui/button'
import React, { Fragment } from 'react'

const EditServiceSettings = () => {
  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        {/* Modified header section */}
        <div className="flex justify-between items-center">
          <h2 className="font-title text-[30px]">Settings</h2>
          <Button
            type="button"
            onClick={() => {}}
            className="bg-orange hover:bg-orange-600 text-white"
          >
            Delete Service
          </Button>
        </div>
        <hr className="w-full h-px my-4 bg-gray-500 border-1" />
      </div>
    </Fragment>  )
}

export default EditServiceSettings
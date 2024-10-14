"use client"; // Ensures this component is rendered client-side

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategoryInput from "../vendor-signup/CategoryInput";
import Link from "next/link"; // Import Next.js Link component

const AddNewService: React.FC = () => {
  const [category, setCategory] = useState<string>(""); // For storing the selected category
  const [serviceName, setServiceName] = useState<string>(""); // For storing the service name

  // Handle category selection from the CategoryInput component
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <h2 className="text-xl mb-4">Add New Service</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <CategoryInput onCategoryChange={handleCategoryChange} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Service Name</label>
        <Input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          value={serviceName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setServiceName(e.target.value)
          }
        />
      </div>

      <div className="flex justify-end space-x-4">
        {/* Use Link to navigate to /vendor-dashboard/services */}
        <Link href="/vendor-dashboard/services">
          <Button className="bg-blue-500 text-white">
            Submit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddNewService;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryInput from "@/components/vendor-signup/CategoryInput";
import Header from "@/components/shared/Headers/Header";
import { CREATE_SERVICE } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

const AddNewService: React.FC = () => {
  const { vendor } = useVendorAuth();
  const router = useRouter();

  const [createService, { loading }] = useMutation(CREATE_SERVICE);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  // Handle category selection from the CategoryInput component
  const handleCategoryChange = (selectedCategory: string) => {
    setFormData({
      ...formData,
      category: selectedCategory,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await createService({
        variables: {
          input: {
            name: formData.name,
            category: formData.category,
            vendor_id: vendor?.id,
          },
        },
      });

      if (response.data) {
        toast.success("Service created successfully!", {
          style: { background: "#333", color: "#fff" },
        });
      }

      router.push("/vendor-dashboard");
    } catch (err) {
      console.error("Error creating service:", err);
      toast.error("Could not create new service", {
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-lightYellow font-title min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row h-[800px] w-full md:w-10/12 lg:w-8/12 shadow-lg rounded-lg overflow-hidden md:h-[700px]">

          {/* Left Image Section */}
          <div className="relative w-full md:w-6/12 h-96 md:h-auto">
            <Image src="/images/onBoard1.webp" layout="fill" objectFit="cover" alt="onboard image" />
          </div>

          {/* Right Form Section */}
          <div className="relative w-full md:w-6/12 p-8 md:p-10 bg-white border-l-2 border-gray-200 flex flex-col items-center">
            {/* Form Heading */}
            <h2 className="text-3xl mt-10 mb-16 text-center font-semibold">Add New Service</h2>
            {/* Input Fields */}
            <div className="flex flex-wrap mx-4 mb-10">
              <form onSubmit={onSubmit}>
                <div className="mb-4 w-80">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Service Name
                  </label>
                  <Input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6 w-80">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <CategoryInput onCategoryChange={handleCategoryChange} />
                </div>
                <div className="flex justify-start space-x-4">
                  <Button
                    type="submit"
                    variant="signup"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Service"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddNewService;

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

const AddNewService: React.FC = () => {
  const { vendor } = useVendorAuth();
  const router = useRouter();

  const [category, setCategory] = useState<string>("");
  const [createService, { loading }] = useMutation(CREATE_SERVICE);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  // Handle category selection from the CategoryInput component
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
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

      router.push('/vendor-dashboard')
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
      <div className="bg-lightYellow rounded-lg p-6 w-full">
        <h2 className="text-xl mb-4">Add New Service</h2>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <CategoryInput onCategoryChange={handleCategoryChange} />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default AddNewService;

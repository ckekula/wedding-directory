"use-client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import CategoryInput from "./CategoryInput";
import CityInput from "./CityInput";
import { Button } from "../ui/button";
const SearchBar: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity);
  };

  const handleSearch = () => {
    console.log(`Searching for ${category} in ${city}`);
    // Add your search logic here
  };

  return (
    <div className="flex items-center justify-center py-10 ">
      <div className="flex items-center bg-white shadow-lg rounded-full w-[650px] h-[70px] px-4 space-x-4">
        {/* Category Input */}
        <div className="relative flex-1">
          <label className="block text-xs text-slate-600 mb-1">Category</label>
          <CategoryInput onCategoryChange={handleCategoryChange} />
        </div>
        {/* Location Input */}
        <div className="relative flex-1">
          <label className="block text-xs text-slate-600 mb-1">Location</label>
          <CityInput onCityChange={handleCityChange} />
        </div>

        {/* Search Button */}
        <div className="flex justify-end rounded-s-none">
          <Button
            onClick={handleSearch}
            className="flex items-center justify- h-full rounded-r-full  w-[70px] mr-0 "
            variant="signup"
          >
            <IoIosSearch size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

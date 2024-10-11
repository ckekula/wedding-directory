"use-client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import CategoryInput from "./CategoryInput";
import CityInput from "./CityInput";
import { Button } from "../ui/button";

interface FilterSearchBarProps {
  handleSearch: (city: string, category: string) => void;
}

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({ handleSearch }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity);
  };

  const onSearch = () => {
    handleSearch(city || "", category || "");
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center bg-white shadow-lg rounded-full w-[650px] h-[70px] px-4 space-x-4">
        {/* Category Input */}
        <div className="relative flex-1">
          <label className="block text-xs text-slate-600 mb-1 ml-3">Category</label>
          <CategoryInput onCategoryChange={handleCategoryChange} />
        </div>
        {/* Location Input */}
        <div className="relative flex-1">
          <label className="block text-xs text-slate-600 mb-1 ml-3">Location</label>
          <CityInput onCityChange={handleCityChange} />
        </div>

        {/* Search Button */}
        <div className="flex justify-end rounded-s-none">
          <Button
            onClick={onSearch}
            className="flex items-center justify-center h-full rounded-r-full w-[70px] mr-0"
            variant="signup"
          >
            <IoIosSearch size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSearchBar;

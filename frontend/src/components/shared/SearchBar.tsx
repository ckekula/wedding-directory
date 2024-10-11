'use client';

import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { SearchBarProps } from "@/types/homeTypes";
import categories from '../../utils/category.json';
import { useRouter } from "next/navigation";

const SearchBar: React.FC<SearchBarProps> = ({
  showIcon = true,
  placehHolderText = "Search...",
}) => {

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // Handle input change and filter categories
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter categories based on input value
    if (value) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <input
            type="text"
            placeholder={placehHolderText}
            value={searchTerm}
            onChange={handleInputChange}
            className={`p-2 rounded-full border border-black text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent font-body ${
              showIcon ? "pl-10" : "pl-4"
            } w-[300px] sm:w-[400px] lg:w-[332px]`}
          />
        {showIcon && (
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdSearch className="w-[25px] h-[25px] text-black" />
          </div>
        )}

        {/* Autocomplete dropdown */}
        {filteredCategories.length > 0 && (
          <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {filteredCategories.map((category, index) => (
              <li
                key={index}
                className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSearchTerm(category); // Set selected category to input
                  setFilteredCategories([]); // Hide dropdown after selection
                  router.push("/vendor-search");
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default SearchBar;

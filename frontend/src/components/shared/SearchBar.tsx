import React from "react";
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
  showIcon?: boolean;
  placehHolderText?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({
  showIcon = true,
  placehHolderText = "Search...",
}) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative">
        <input
          type="text"
          placeholder={placehHolderText}
          className={`p-2  rounded-full border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent font-body ${showIcon ? "pl-10" : "pl-4"}`}
        />
        {showIcon && (
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdSearch className="w-[25px] h-[25px] text-black" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

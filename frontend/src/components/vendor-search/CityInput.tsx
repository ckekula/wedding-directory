"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import cities from "../../utils/city.json";
import { Button } from "../ui/button";
import { CityProps } from "@/types/signupInput";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CityInput: React.FC<CityProps> = ({ onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    onCityChange(city);
  };

  const provinces = [...new Set(cities.map((city) => city.Province))];

  const getDistrictsByProvince = (province: string) => {
    return [
      ...new Set(
        cities
          .filter((city) => city.Province === province)
          .map((city) => city.District)
      ),
    ];
  };

  const getCitiesByDistrict = (district: string) => {
    return cities
      .filter((city) => city.District === district)
      .map((city) => city.City);
  };

  return (
    <div className="rounded-lg bg-white/20 font-body backdrop-blur-sm transition duration-150">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex justify-between items-center w-full text-left px-3 py-2 text-black bg-white/30 rounded-lg hover:bg-white/40 transition duration-150 font-light font-title h-10">
            <span className="font-title font-normal text-[16px]">
              {selectedCity || "Select City"}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg max-h-60 overflow-y-auto font-body z-10">
          <DropdownMenuLabel className="font-body px-4 py-2 text-gray-500">
            Find Your City
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {provinces.map((province, provinceIndex) => (
              <DropdownMenuSub key={provinceIndex}>
                <DropdownMenuSubTrigger className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-150">
                  {province}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm max-h-60 overflow-y-auto">
                    {getDistrictsByProvince(province).map(
                      (district, districtIndex) => (
                        <DropdownMenuSub key={districtIndex}>
                          <DropdownMenuSubTrigger className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-150">
                            {district}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm max-h-60 overflow-y-auto">
                              {getCitiesByDistrict(district).map(
                                (city, cityIndex) => (
                                  <DropdownMenuItem
                                    key={cityIndex}
                                    onClick={() => handleCitySelect(city)}
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-150"
                                  >
                                    {city}
                                  </DropdownMenuItem>
                                )
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      )
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CityInput;

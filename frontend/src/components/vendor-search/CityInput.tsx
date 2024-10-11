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
import { ChevronDown } from "lucide-react"; // Import the ChevronDown icon

const CityInput: React.FC<CityProps> = ({ onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null); // State to store selected city

  const handleCitySelect = (city: string) => {
    setSelectedCity(city); // Update the selected city
    onCityChange(city); // Call the parent handler
  };

  const provinces = [...new Set(cities.map((city) => city.Province))];

  const getDistrictsByProvince = (province: string) => {
    const districts = [
      ...new Set(
        cities
          .filter((city) => city.Province === province)
          .map((city) => city.District)
      ),
    ];
    return districts;
  };

  const getCitiesByDistrict = (district: string) => {
    const citiesByDistrict = cities
      .filter((city) => city.District === district)
      .map((city) => city.City);
    return citiesByDistrict;
  };

  return (
    <div className="rounded-lg flex flex-row space-y-1.5 bg-white font-body ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex flex-row justify-between items-center w-full text-left space-y-1.5 text-black hover:bg-white bg-white h-8 text-lg font-title font-light ">
            <span>{selectedCity ? selectedCity : "Select City"}</span>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-body">
          <DropdownMenuLabel className="font-body">
            Find Your City
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* Provinces */}
            {provinces.map((province, provinceIndex) => (
              <DropdownMenuSub key={provinceIndex}>
                <DropdownMenuSubTrigger>{province}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="font-body">
                    {/* Districts */}
                    {getDistrictsByProvince(province).map(
                      (district, districtIndex) => (
                        <DropdownMenuSub key={districtIndex}>
                          <DropdownMenuSubTrigger>
                            {district}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="font-body">
                              {/* Cities */}
                              {getCitiesByDistrict(district).map(
                                (city, cityIndex) => (
                                  <DropdownMenuItem
                                    key={cityIndex}
                                    onClick={() => handleCitySelect(city)}
                                    
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

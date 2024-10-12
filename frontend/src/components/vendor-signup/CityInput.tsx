'use client';

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
import cities from '../../utils/city.json';
import { Button } from "../ui/button";
import { CityProps } from "@/types/signupInput";
import { useState } from "react";

const CityInput: React.FC<CityProps> = ({ onCityChange, placeholder }) => {

  const [selectedCity, setSelectedCity] = useState<string | null>(null); // State to store selected city

  const handleCitySelect = (city: string) => {
    setSelectedCity(city); // Update the selected city
    onCityChange(city); // Call the parent handler
  };

  const provinces = [...new Set(cities.map(city => city.Province))];

  const getDistrictsByProvince = (province: string) => {
    const districts = [...new Set(
      cities
        .filter(city => city.Province === province)
        .map(city => city.District)
    )];
    return districts;
  };

  const getCitiesByDistrict = (district: string) => {
    const citiesByDistrict = cities
      .filter(city => city.District === district)
      .map(city => city.City);
    return citiesByDistrict;
  };

  return (
    <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5 bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex flex-row justify-start text-left w-full space-y-1.5 text-black hover:bg-white bg-white h-8">
            {selectedCity ? selectedCity : placeholder} {/* Show selected city */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Find Your City</DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* Provinces */}
            {provinces.map((province, provinceIndex) => (
              <DropdownMenuSub key={provinceIndex}>
                <DropdownMenuSubTrigger>{province}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {/* Districts */}
                    {getDistrictsByProvince(province).map((district, districtIndex) => (
                      <DropdownMenuSub key={districtIndex}>
                        <DropdownMenuSubTrigger>{district}</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {/* Cities */}
                            {getCitiesByDistrict(district).map((city, cityIndex) => (
                              <DropdownMenuItem key={cityIndex} onClick={() => handleCitySelect(city)}>
                                {city}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
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

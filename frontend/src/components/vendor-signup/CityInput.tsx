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

const CityInput = () => {
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-none hover:bg-none" variant="ghost">Select City</Button>
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
                              <DropdownMenuItem key={cityIndex}>{city}</DropdownMenuItem>
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

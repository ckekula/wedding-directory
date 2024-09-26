import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import cities from '../../utils/city.json'

const CityInput = () => {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city, index) => (
            <SelectItem key={index} value={city.City}>
              {city.City} ({city.District}, {city.Province})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CityInput;
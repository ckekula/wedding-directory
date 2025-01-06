import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import categories from "../../utils/category.json";
import { CategoryProps } from "@/types/signupInput";

const CategoryInput: React.FC<CategoryProps> = ({ onCategoryChange }) => {
  const handleCategorySelect = (value: string) => {
    onCategoryChange(value);
  };

  return (
    <Select onValueChange={handleCategorySelect}>
      <SelectTrigger
        id="bcategory"
        variant="borderless"
        className="h-10 w-full bg-white/50 px-3 py-2 text-left font-title text-[16px] text-black focus:outline-none rounded-lg backdrop-blur-sm hover:bg-white/30 transition duration-150"
      >
        <SelectValue placeholder="Select Service" />
      </SelectTrigger>
      <SelectContent className="w-full bg-white/30 backdrop-blur-sm rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
        {categories.map((category, index) => (
          <SelectItem
            key={index}
            value={category}
            className="p-2 text-gray-800 font-body hover:bg-gray-300/40 rounded-lg cursor-pointer transition duration-150 ease-in-out"
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryInput;

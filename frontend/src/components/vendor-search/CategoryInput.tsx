import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
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
        className="h-10 w-full bg-white px-3 py-2 text-left font-body text-[16px] text-black focus:outline-none"
      >
        <SelectValue placeholder="Business Category" />
      </SelectTrigger>
      <SelectContent className="w-full bg-white" position="popper">
        {categories.map((category, index) => (
          <SelectItem
            key={index}
            value={category}
            className="p-2 hover:bg-gray-100 font-body"
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryInput;

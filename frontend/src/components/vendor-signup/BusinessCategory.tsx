'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import categories from '../../utils/category.json'
import { CategoryProps } from "@/types/signupInput";
  
const BusinessCategory: React.FC<CategoryProps> = ({ onCategoryChange }) => {
  
    const handleCategorySelect = (value: string) => {
      onCategoryChange(value);
    };

    return (
        <Select onValueChange={handleCategorySelect}>
            <SelectTrigger className="h-8" id="bcategory">
                <SelectValue placeholder="Business Category" />
            </SelectTrigger>
            <SelectContent position="popper">
                {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>{category}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default BusinessCategory;
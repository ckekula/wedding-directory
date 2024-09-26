'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import categories from '../../utils/category.json'

const BusinessCategory = () => {

    return (
        <Select>
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
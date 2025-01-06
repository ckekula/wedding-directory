export interface OfferingProps {
    name: string,
    vendor: string,
    city: string, 
    rating: string, 
    banner: string,
    link: string,
    buttonText: string
}

export interface FilterSearchBarProps {
    handleSearch: (city: string, category: string) => void;
    onCityChange: (city: string) => void;
    onCategoryChange: (category: string) => void;
}
  
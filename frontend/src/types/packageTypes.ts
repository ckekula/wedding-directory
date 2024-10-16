export interface PackageProps {
    name: string,
    vendor: string,
    city: string, 
    rating: string, 
    price: string, 
    banner: string,
    about: string,
    showStats: boolean,
    link: string,
    buttonText: string
}

export interface FilterSearchBarProps {
    handleSearch: (city: string, category: string) => void;
    onCityChange: (city: string) => void;
    onCategoryChange: (category: string) => void;
}
  
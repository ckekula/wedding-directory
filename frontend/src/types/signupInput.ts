export interface CategoryProps {
    onCategoryChange: (category: string) => void;
}

export interface CityProps {
    onCityChange: (category: string) => void;
}

export interface LocationProps {
    onLocationChange: (category: string) => void;
    disabled?: boolean;
}
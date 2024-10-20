export interface CategoryProps {
    onCategoryChange: (category: string) => void;
}

export interface CityProps {
    onCityChange: (category: string) => void;
    placeholder: string;
}

export interface LocationProps {
    onLocationChange: (category: string) => void;
    disabled?: boolean;
    placeholder: string;
}

export interface VisitorSignupProps {
    isVisible: boolean;
    onClose: () => void;
}
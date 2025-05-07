export interface OfferingProps {
    name: string,
    vendor: string,
    city: string, 
    reviews: Review[];
    banner: string,
    link: string,
    buttonText: string
}

export interface FilterSearchBarProps {
    handleSearch: (city: string, category: string) => void;
    onCityChange: (city: string) => void;
    onCategoryChange: (category: string) => void;
}

export type SocialTypes = {
    website?: string;
    facebook?: string;
    instagram?: string;
    x?: string;
};

interface Review {
    rating: string;
}

export interface Offering {
    id: string;
    name: string;
    category: string;
    visible: boolean;
    banner: string | null;
    reviews: Review[];
    vendor: {
        id: string;
        busname: string;
        city: string;
        phone: string;
    };
}
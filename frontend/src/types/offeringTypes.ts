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

export type SocialTypes = {
    website?: string;
    facebook?: string;
    instagram?: string;
    x?: string;
};

export interface Offering {
    id: string;
    name: string;
    category: string;
    visible: boolean;
    bus_phone: string | null;
    bus_email: string | null;
    description: string | null;
    banner: string | null;
    vendor: {
        id: string;
        busname: string;
        city: string;
        phone: string;
    } | null;
}
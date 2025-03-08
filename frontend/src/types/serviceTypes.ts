export interface ProfileData {
    category: string;
    businessPhone: string;
    businessEmail: string;
    description: string;
    pricing: string;
}
  
export interface EditProfileProps {
    isServiceVisible: boolean; // Prop for service visibility
}

export interface SocialData {
    websiteURL: string;
    xURL: string;
    tiktokURL: string;
    instagramURL: string;
    facebookURL: string;
}


export interface ServicesMenuProps {
    setActiveSection: (section: string) => void;
}

// New Service Interface
export interface Service {
    id: string;
    name: string;
    description: string;
    vendor?: {
        busname: string;
        city: string;
    };
    banner:string;
}
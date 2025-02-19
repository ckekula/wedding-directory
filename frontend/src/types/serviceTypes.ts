export interface ProfileData {
    category: string;
    businessPhone: string;
    businessEmail: string;
    description: string;
}
  
export interface EditProfileProps {
    isServiceVisible: boolean;
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
}
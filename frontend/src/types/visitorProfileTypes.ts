interface UpdatedProfileData {
  firstName: string;
  lastName: string;
  partnerFirstName: string;
  partnerLastName: string;
  engagementDate: Date;
  weddingDate: Date;
  weddingVenue: string;
  email: string;
  password: string;
}

export interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profileData: {
      firstName: string;
      lastName: string;
      partnerFirstName: string;
      partnerLastName: string;
      engagementDate: Date;
      weddingDate: Date;
      weddingVenue: string;
      email: string;
      password: string;
    };
    onSave: (updatedData: UpdatedProfileData) => void;
}

export interface WeddingDetailsData {
    firstName: string;
    lastName: string;
    partnerFirstName: string;
    partnerLastName: string;
    engagementDate: string;
    weddingDate: string;
    weddingVenue: string;
}

export interface AccountDetailsData {
  email: string;
  password: string;
  retypePassword: string;
}
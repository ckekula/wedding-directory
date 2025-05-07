export interface ProfileData {
    firstName: string;
    lastName: string;
    phone: string;
}

export interface GeneralData {
    businessName: string;
    city: string;
    location: string;
    about: string;
}

export interface AccountData {
    email: string;
    password: string;
    rePassword: string;
}

export interface VendorProps {
  vendor: {
    profilePic: string,
    fname: string,
    lname: string,
    city: string,
    busname: string,
    phone: string,
    email: string,
  }
}
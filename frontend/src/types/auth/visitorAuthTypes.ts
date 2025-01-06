export interface VisitorLoginProps {
    isVisible: boolean;
    onClose: () => void;
}

export interface SignupFormState {
    email: string;
    password: string;
}
  
export interface SignupFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export interface LoginFormState {
    email: string;
    password: string;
}
  
export interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}
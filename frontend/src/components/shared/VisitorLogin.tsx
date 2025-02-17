'use client'

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VisitorSignup from "./VisitorSignup";
import { useRouter } from 'next/navigation';
import { loginVisitor as loginApi } from '@/api/auth/visitor.auth.api';
import { useAuth } from "@/contexts/VisitorAuthContext";
import { toast } from 'react-hot-toast';
import LoaderJelly from "@/components/shared/Loaders/LoaderJelly";
import { SignupFormErrors, SignupFormState, VisitorLoginProps } from "@/types/auth/visitorAuthTypes";

const VisitorLogin: React.FC<VisitorLoginProps> = ({ isVisible, onClose }) => {
  const [formState, setFormState] = useState<SignupFormState>({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<SignupFormErrors>({});
  const [showVisitorSignup, setShowVisitorSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const validateForm = useCallback((): boolean => {
    const errors: SignupFormErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formState.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formState.password) {
      errors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof SignupFormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "wrapper") onClose();
  }, [onClose]);

  const getStoredToken = useCallback((): string | null => {
    const storedToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='));
    
    return storedToken ? storedToken.split('=')[1] : null;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginApi(formState.email, formState.password);

      if (response) {
        const token = getStoredToken();
        
        if (token) {
          login(token);
          router.push('/visitor-dashboard');
        } else {
          throw new Error('No token received');
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed! Please try again.';
      setFormErrors(prev => ({
        ...prev,
        general: errorMessage
      }));
      toast.error(errorMessage, {
        style: { background: '#333', color: '#fff' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center px-4"
      id="wrapper"
      onClick={handleClose}
    >
      {isLoading ? (
        <LoaderJelly />
      ) : (
        <div className="bg-white mt-6 w-full max-w-[450px] rounded-md p-4 sm:p-8 font-body">
          <h1 className="text-2xl sm:text-4xl font-bold text-center font-title">
            Start where you left off
          </h1>
          
          {formErrors.general && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {formErrors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <div className="border-black border-solid border-2 border-opacity-70 rounded-md">
                  <Input
                    className="h-12 pl-6 w-full"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={handleInputChange}
                    aria-describedby="email-error"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-sm text-red-600" id="email-error">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="border-black border-solid border-2 border-opacity-70 rounded-md">
                  <Input
                    className="h-12 pl-6 w-full"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleInputChange}
                    aria-describedby="password-error"
                  />
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-600" id="password-error">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6 rounded-none text-black font-bold hover:bg-primary bg-primary text-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>

            <div className="mt-4 space-y-4">
              <p className="text-sm text-center">
                <Link href="/forgot-password" className="text-black hover:underline">
                  Forgot your password?
                </Link>
              </p>

              <hr className="border-t-2 border-gray-300" />

              <p className="text-sm text-center font-bold">
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setShowVisitorSignup(true)}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </button>
              </p>

              <p className="text-sm text-center">
                Are you a wedding service provider?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Start from here
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}

      <VisitorSignup
        isVisible={showVisitorSignup}
        onClose={() => setShowVisitorSignup(false)}
      />
    </div>
  );
};

export default VisitorLogin;
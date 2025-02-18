'use client';

import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import VisitorLogin from "./VisitorLogin";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { loginVisitor as loginApi } from '@/api/auth/visitor.auth.api';
import { toast } from 'react-hot-toast';
import { VisitorSignupProps } from '@/types/signupInput';
import { CREATE_VISITOR_MUTATION } from '@/graphql/mutations';
import { LoginFormErrors, LoginFormState } from '@/types/auth/visitorAuthTypes';

const VisitorSignup: React.FC<VisitorSignupProps> = ({ isVisible, onClose }) => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [showVisitorLogin, setShowVisitorLogin] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();
  const [createVisitor, { loading }] = useMutation(CREATE_VISITOR_MUTATION);

  const validateForm = useCallback((): boolean => {
    const errors: LoginFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formState.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formState.password) {
      errors.password = 'Password is required';
    } else if (formState.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name as keyof LoginFormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleSignupSuccess = useCallback(async () => {
    try {
      await loginApi(formState.email, formState.password);
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

      if (token) {
        login(token);
        router.push('/pageone');
      } else {
        throw new Error('Token not found');
      }
    } catch (error) {
      throw new Error('Auto-login failed after signup');
      console.log(error);
    }
  }, [formState.email, formState.password, login, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const { data } = await createVisitor({
        variables: {
          email: formState.email,
          password: formState.password,
        },
        context: { fetchOptions: { credentials: 'include' } }
      });

      if (data) {
        toast.success('Successfully Registered!', {
          style: { background: '#333', color: '#fff' }
        });
        await handleSignupSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setFormErrors(prev => ({ ...prev, general: errorMessage }));
      toast.error('Registration Failed!', {
        style: { background: '#333', color: '#fff' }
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center' onClick={handleClose}>
      <div className='bg-white mt-6 w-full max-w-[450px] rounded-md p-8 font-body' onClick={(e) => e.stopPropagation()}>
        <h1 className='text-3xl font-bold text-center font-title mb-8'>Welcome to Say I Do</h1>

        {formErrors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {formErrors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="border-black border-solid border-2 border-opacity-70 rounded-md">
                <Input
                  className="h-12 pl-6"
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
                  className="h-12 pl-6"
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketingConsent"
              name="marketingConsent"
              onCheckedChange={(checked) => 
                setFormState(prev => ({ ...prev, marketingConsent: checked === true }))
              }
            />
            <label htmlFor="marketingConsent" className="text-sm">
              Send me wedding tips, ideas and special offers
            </label>
          </div>

          <Button
            className="w-full rounded-none text-black font-bold hover:bg-primary bg-primary text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>

          <hr className="border-t-2 border-gray-300" />

          <div className="space-y-2 text-center text-sm">
            <p className="font-bold">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setShowVisitorLogin(true)}
                className="hover:underline text-primary"
              >
                Sign In
              </button>
            </p>
            <p>
              Are you a wedding service provider?{' '}
              <Link href="/sign-up" className="hover:underline text-primary">
                Start from here
              </Link>
            </p>
          </div>
        </form>
      </div>

      <VisitorLogin 
        isVisible={showVisitorLogin} 
        onClose={() => setShowVisitorLogin(false)} 
      />
    </div>
  );
};

export default VisitorSignup;
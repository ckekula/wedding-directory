'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/VisitorAuthContext";
import { loginVisitor as loginApi } from '@/api/auth/visitor.auth.api';
import { toast } from 'react-hot-toast';
import { CREATE_VISITOR_MUTATION } from '@/graphql/mutations';
import Image from 'next/image';
import Header from '@/components/shared/Headers/Header';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();  // Access the login method from VisitorAuthContext

  // Use Apollo's useMutation for the signup mutation
  const [createVisitor, { loading }] = useMutation(CREATE_VISITOR_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error before submission

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      // Perform signup mutation
      const response = await createVisitor({
        variables: {
          email,
          password,
        },
        context: {
          fetchOptions: {
            credentials: 'include',
          },
        },
      });

      if (response.data) {
        toast.success('Successfully Registered!', {style: {background: '#333', color: '#fff',},});
        console.log('Visitor created successfully:', response.data.createVisitor);

        // After successful signup, login using the provided email and password
        await loginApi(email, password);

        // Check if the backend set the token in the cookies
        const storedToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='));

        if (storedToken) {
          const token = storedToken.split('=')[1];
          login(token);  // Call the login method from context to set the visitor in state

          // Redirect to onboarding page one
          router.push('/pageone');
        } else {
          setError('Login failed. Token not found in cookies.');
        }

      } else {
        setError('Signup failed. Please try again.');
      }

    } catch (err) {
      toast.error('Registration Failed!', {style: {background: '#333', color: '#fff',},});
      console.error('Signup or login failed:', err);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className='relative w-full min-h-screen h-screen overflow-hidden '>
      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp" // Same image used in Hero component
          alt="Login Background"
          className="object-cover"
          fill
          priority // Ensures the image is loaded faster
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      <div className='relative z-20 flex justify-center items-center h-full px-4'>
        <div className='bg-white w-[450px] rounded-md p-8 font-body shadow-lg'>
          <h1 className='text-3xl font-bold text-center font-title'>
            Welcome to Say I Do
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mt-12 grid grid-cols-1 w-full items-center gap-x-12 gap-y-5">
              <div className="border-black border-solid border-2 border-opacity-70 rounded-md flex flex-row space-y-1.5">
                <Input
                  className="h-12 pl-6 pb-3"
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="border-black border-solid border-2 border-opacity-70 rounded-md flex flex-row space-y-1.5">
                <Input
                  className="h-12 pl-6 pb-3"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}

            <div className="mt-9 flex space-x-2 items-center justify-center">
              <Checkbox id="terms" />
              <label className="text-sm text-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Send me wedding tips, ideas and special offers
              </label>
            </div>

            <div className="mt-6 flex flex-col w-full">
              <Button
                className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg"
                type="submit"
                disabled={loading}  // Disable button during mutation
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </div>

            <div className='text-center mt-3'>
              <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Already have an account?{' '}
                <Link href="/visitor-login" className="underline">
                  Sign In
                </Link>
              </label>
            </div>

            <div className="text-center mt-2">
              <label
                htmlFor="terms"
                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Are you a wedding service provider?{" "}
                <Link href="/sign-up" className="underline">
                  Start from here
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

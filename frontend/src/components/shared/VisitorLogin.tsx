'use client'
import { useState, MouseEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VisitorSignup from "./VisitorSignup";
import { useRouter } from 'next/navigation';
import { loginVisitor as loginApi } from '@/api/auth/visitor.auth.api';
import { useAuth } from "@/contexts/VisitorAuthContext";

interface VisitorLoginProps {
  isVisible: boolean;
  onClose: () => void;
}

const VisitorLogin: React.FC<VisitorLoginProps> = ({ isVisible, onClose }) => {
  const [showVisitorSignup, setShowVisitorSignup] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth(); // Access login function from the context

  if (!isVisible) return null;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "wrapper") onClose();
  };

  // Handles form submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error before making the login request

    try {
      const response = await loginApi(email, password);

      if (response) {
        // Since the token is now stored in a cookie, trigger the context login using the cookie token
        const storedToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='));

        if (storedToken) {
          const token = storedToken.split('=')[1];
          login(token); // Call the context login function with the token
        }

        // Redirect to profile page after successful login
        router.push('/visitor-dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white mt-6 w-[450px] rounded-md p-8 font-body">
        <h1 className=" text-4xl font-bold text-center font-title">
          Start where you left off
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
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <div className="  mt-6 flex flex-col w-full ">
            <Button type="submit" className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg">
              Log In
            </Button>
          </div>
          <div className="text-center mt-2">
            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Forget your password?
            </label>
          </div>
          <hr className="border-t-2 border-gray-300 my-4" />
          <div className="text-center mt-3">
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don&apos;t have an account?{" "}
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setShowVisitorSignup(true);
                }}
                className="underline"
              >
                Sign Up
              </Link>
            </label>
          </div>
          <div className="text-center mt-2">
            <label
              htmlFor="terms"
              className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Are you a wedding service provider?{" "}
              <Link href="/login" className="underline">
                Start from here
              </Link>
            </label>
          </div>
        </form>
      </div>
      <VisitorSignup
        isVisible={showVisitorSignup}
        onClose={() => setShowVisitorSignup(false)}
      />
    </div>
  );
};

export default VisitorLogin;

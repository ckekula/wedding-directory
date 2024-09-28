"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginApi } from '@/api/auth/auth.api';
import { useAuth } from "@/contexts/VisitorAuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth(); // Access login function from the context

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
        router.push('/profile');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Start where you left off</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-pink-300 hover:bg-pink-400 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Log In
        </button>
      </form>

      <div className="text-center mt-4">
        <a href="/forgot-password" className="text-sm text-gray-600 hover:underline">
          Forget your password?
        </a>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-pink-500 hover:underline font-semibold">
            Sign Up
          </a>
        </p>
      </div>

      <div className="text-center mt-2">
        <p className="text-sm text-gray-600">
          Are you a wedding service provider?{' '}
          <a href="/provider" className="text-pink-500 hover:underline font-semibold">
            Start from here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

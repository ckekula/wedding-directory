// src/app/signin/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginApi } from '@/api/auth/auth.api';
import { useAuth } from "@/contexts/VisitorAuthContext";

const SignIn = () => {
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

            if (response ) {
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
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;

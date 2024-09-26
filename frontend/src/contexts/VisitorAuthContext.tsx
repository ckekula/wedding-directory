// src/context/VisitorAuthContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // For decoding the JWT token

interface Visitor {
    id: string;
    email: string;
    // Add more fields if needed
}

interface AuthContextProps {
    visitor: Visitor | null;
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [visitor, setVisitor] = useState<Visitor | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // On first render, check if a token exists in the cookies
        const storedToken = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        if (storedToken) {
            const token = storedToken.split('=')[1];
            login(token);
        }
    }, []);

    const login = (token: string) => {
        const decoded = jwtDecode<any>(token);
        setVisitor({ id: decoded.sub, email: decoded.email });
        setAccessToken(token);

        // Optionally: Save the token in localStorage or keep it in cookies
        document.cookie = `access_token=${token}; path=/;`; // Save token as a cookie
    };

    const logout = () => {
        setVisitor(null);
        setAccessToken(null);
        document.cookie = 'access_token=; Max-Age=0; path=/;'; // Delete the token cookie
        router.push('/signin'); // Redirect to sign-in page
    };

    return (
        <AuthContext.Provider value={{ visitor, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

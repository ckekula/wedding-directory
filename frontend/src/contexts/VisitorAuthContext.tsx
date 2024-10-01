// src/context/VisitorAuthContext.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

interface Visitor {
  id: string;
  email: string;
}

interface AuthContextProps {
  visitor: Visitor | null;
  accessToken: string | null;
  isAuthenticated: boolean; // Add isAuthenticated
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // Function to login by decoding JWT and extracting visitor details
  const login = (token: string) => {
    const decoded = jwtDecode<{ sub: string; email: string }>(token); // Expecting sub (visitor id) and email

    // Set access token and visitor details in state
    setAccessToken(token);
    setVisitor({
      id: decoded.sub, // Assuming the sub is the visitor's ID
      email: decoded.email, // Email extracted from JWT
    });
  };

  const logout = () => {
    // Clear visitor and accessToken state
    setVisitor(null);
    setAccessToken(null);
    // Delete the access_token cookie
    document.cookie = "access_token=; Max-Age=0; path=/;";
    // Redirect to sign-in page
    router.push("/");
  };

  // Check if the visitor is authenticated
  const isAuthenticated = !!accessToken && !!visitor;

  useEffect(() => {
    // On page load, check if there is an access token in the cookies
    const storedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));

    if (storedToken) {
      const token = storedToken.split("=")[1];
      // Automatically log in if the token exists
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ visitor, accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

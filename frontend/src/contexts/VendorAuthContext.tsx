// src/context/VendorAuthContext.tsx
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

interface Vendor {
  id: string;
  email: string;
}

interface AuthContextProps {
  vendor: Vendor | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useVendorAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useVendorAuth must be used within a VendorAuthProvider");
  }
  return context;
};

export const VendorAuthProvider = ({ children }: { children: ReactNode }) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // Function to login by decoding JWT and extracting vendor details
  const login = (token: string) => {
    const decoded = jwtDecode<{ sub: string; email: string }>(token); // Expecting sub (vendor id) and email

    // Set access token and vendor details in state
    setAccessToken(token);
    setVendor({
      id: decoded.sub, // Assuming the sub is the vendor's ID
      email: decoded.email, // Email extracted from JWT
    });
  };

  const logout = () => {
    // Clear vendor and accessToken state
    setVendor(null);
    setAccessToken(null);
    // Delete the access_tokenVendor cookie
    document.cookie = "access_tokenVendor=; Max-Age=0; path=/;";
    // Redirect to sign-in page
    router.push("/");
  };

  // Check if the vendor is authenticated
  const isAuthenticated = !!accessToken && !!vendor;

  useEffect(() => {
    // On page load, check if there is an access tokenVendor in the cookies
    const storedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_tokenVendor="));

    if (storedToken) {
      const token = storedToken.split("=")[1];
      // Automatically log in if the token exists
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ vendor, accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

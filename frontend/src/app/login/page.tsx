'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { login as loginApi } from '@/api/auth/auth.api';

const LoginPopup = ({ closePopup }: { closePopup: () => void }) => {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await loginApi(email, password);

            if (response && response.status === 200) {
                const storedToken = document.cookie
                  .split('; ')
                  .find(row => row.startsWith('access_token='));

                if (storedToken) {
                    const token = storedToken.split('=')[1];
                    login(token);
                    router.push('/profile');
                    closePopup();  // Close the popup after successful login
                } else {
                    setError('Token not found in cookies. Login failed.');
                }
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err: any) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="popup">
          <div className="popup-content">
              <form onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error && <div className="error">{error}</div>}
                  <Button type="submit" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                  </Button>
              </form>
              <button onClick={closePopup}>Close</button>
          </div>
      </div>
    );
};

export default LoginPopup;

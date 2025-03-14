'use client'

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";
import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { CREATE_VENDOR } from "@/graphql/mutations";
import CityInput from "@/components/vendor-signup/CityInput";
import LocationInput from "@/components/vendor-signup/LocationInput";
import { useRouter } from "next/navigation";
import FirstNameInput from "@/components/vendor-signup/FirstNameInput";
import LastNameInput from "@/components/vendor-signup/LastNameInput";
import BusinessNameInput from "@/components/vendor-signup/BusinessNameInput";
import PhoneInput from "@/components/vendor-signup/PhoneInput";
import EmailInput from "@/components/vendor-signup/EmailInput";
import PasswordInput from "@/components/vendor-signup/PasswordInput";
import RePassword from "@/components/vendor-signup/RePassword";
import { toast } from 'react-hot-toast';
import { useVendorAuth } from '@/contexts/VendorAuthContext';
import { loginVendor as loginApi } from '@/api/auth/vendor.auth.api';

const Signup = () => {
  const router = useRouter();
  const { login } = useVendorAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rpassword: '',
    fname: '',
    lname: '',
    busname: '',
    phone: '',
    city: '',
    location: ''
  });

  const [createVendor, { loading }] = useMutation(CREATE_VENDOR);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (location: string) => {
    setFormData({ ...formData, location });
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
  };

  // Go to vendor login page
  const goToVendorLogin = () => {
    router.push('/login');
  };

  // Register vendor
  const onRegister = async () => {

    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions', {
        style: { background: '#333', color: '#fff' },
      });
      return;
    }

    try {
      const response = await createVendor({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
            fname: formData.fname,
            lname: formData.lname,
            busname: formData.busname,
            phone: formData.phone,
            city: formData.city,
            location: formData.location
          },
        },
      });

      if (response.data) {
        toast.success('Account created successfully!', {
          style: { background: '#333', color: '#fff' },
        });

        // Login with the created email and password
        await loginApi(formData.email, formData.password);

        // Check for token in cookies
        const storedToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_tokenVendor='));

        if (storedToken) {
          const token = storedToken.split('=')[1];
          login(token);  // Set vendor in context state
          router.push('/vendor-dashboard');
        } else {
          toast.error('Login failed. Token not found in cookies', {
            style: { background: '#333', color: '#fff' },
          });
        }
      }
    } catch (err) {
      console.error("Error creating vendor:", err);
      toast.error('Unsuccessful registration', {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="relative z-10 w-full h-[1000px] md:h-[800px]">
        <Image
          src="/images/login-signup.webp"
          layout="fill"
          objectFit="cover"
          alt="sign image"
        />
        <div className="absolute inset-0 font-body">
          <div className='flex flex-col justify-center items-center text-center'>
            <div><p className="mt-8 w-full">Crafting Timeless Celebrations</p></div>
            <div><h1 className="font-title font-bold text-3xl w-full ">Welcome Vendors</h1></div>
            <div className='bg-white bg-opacity-70 mt-6 w-[350px] md:w-[600px] border-solid border-black border-2 border-opacity-60 rounded-md p-8' >
              <h1 className='text-text mx-[30px] md:mx-[90px] text-2xl font-bold text-center font-title'>Connect with couples to make their dream wedding come true!</h1>
              <form>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 w-full items-center gap-x-12 gap-y-5">
                  <FirstNameInput value={formData.fname} onChange={handleChange} />
                  <LastNameInput value={formData.lname} onChange={handleChange} />
                  <BusinessNameInput value={formData.busname} onChange={handleChange} />
                  <CityInput placeholder='Select city' onCityChange={handleCityChange} />

                  <div className="md:col-span-2">
                    <LocationInput placeholder='Search for location' onLocationChange={handleLocationChange} />
                  </div>

                  <PhoneInput value={formData.phone} onChange={handleChange} />
                  <EmailInput value={formData.email} onChange={handleChange} />
                  <PasswordInput value={formData.password} onChange={handleChange} />
                  <RePassword value={formData.rpassword} onChange={handleChange} />
                </div>

                <div className="mt-6 flex space-x-2">
                <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(!!checked)} />
                <label
                    htmlFor="terms"
                    className="text-sm text-left leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    By submitting and sharing your information, you agree to the{' '}
                    <Link href="/terms-of-use" target="_blank" className="underline hover:text-orange">
                      terms of use
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" target="_blank" className="underline hover:text-orange">
                      privacy policy
                    </Link>{' '}
                    of Say I Do.
                  </label>
                </div>

                <div className="border-black rounded-md border-2 mt-6 flex flex-col w-full border-solid  bg-primary">
                  <Button
                    onClick={onRegister}
                    className="rounded-none text-black font-bold hover:bg-primary bg-primary text-xl"
                    disabled={loading || !termsAccepted} // Disable if loading or terms not accepted
                  >
                    {loading ? "Registering..." : "Register Now"}
                  </Button>
                </div>
              </form>

              <div className="mt-2">
                Already have an account?<span> </span>
                <button onClick={goToVendorLogin}>
                  <div className="text-decoration-line: underline hover:text-orange">Login</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;

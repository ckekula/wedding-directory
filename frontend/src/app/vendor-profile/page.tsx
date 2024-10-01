"use client";

import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useVendorAuth } from "@/contexts/VendorAuthContext"; // Use VendorAuthContext

const GET_VENDOR_BY_ID = gql`
    query GetVendorById($id: String!) {
        findVendorById(id: $id) {
            id
            email
            fname
            lname
            busname
            phone
            category
        }
    }
`;

const VendorProfile = () => {
  const { vendor, accessToken, login, isAuthenticated } = useVendorAuth();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const storedToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_tokenVendor='));

    if (storedToken) {
      const token = storedToken.split('=')[1];
      if (!accessToken) {
        login(token);
      }
    }
    setTokenChecked(true);
  }, [accessToken, login]);

  const { data, loading, error } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  if (!tokenChecked) {
    return <p>Checking authentication status...</p>;
  }

  if (!accessToken) {
    return <p>Please log in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading vendor information...</p>;
  }

  if (error) {
    return <p>Error loading profile information: {error.message}</p>;
  }

  const vendorData = data?.findVendorById;

  return (
    <div>
      <h1>Profile Information</h1>
      <p><strong>ID:</strong> {vendorData.id}</p>
      <p><strong>Email:</strong> {vendorData.email}</p>
      <p><strong>First Name:</strong> {vendorData.fname || "N/A"}</p>
      <p><strong>Last Name:</strong> {vendorData.lname || "N/A"}</p>
      <p><strong>Business Name:</strong> {vendorData.busname || "N/A"}</p>
      <p><strong>Phone:</strong> {vendorData.phone || "N/A"}</p>
      <p><strong>Category:</strong> {vendorData.category || "N/A"}</p>
    </div>
  );
};

export default VendorProfile;

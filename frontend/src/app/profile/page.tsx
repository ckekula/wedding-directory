// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { gql, useQuery } from "@apollo/client";

const GET_VISITOR_BY_ID = gql`
    query GetVisitorById($id: String!) {
        findVisitorById(id: $id) {
            id
            email
            visitor_fname
            visitor_lname
            partner_fname
            partner_lname
        }
    }
`;

const Profile = () => {
    const { visitor, accessToken, login, isAuthenticated } = useAuth(); // Added login method for token context management
    const [tokenChecked, setTokenChecked] = useState(false); // To track token check status

    // Extract the token from the cookie and perform auto-login if the token is valid
    useEffect(() => {
        const storedToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('access_token='));

        if (storedToken) {
            const token = storedToken.split('=')[1];
            if (!accessToken) {
                // Perform login with token if it's not already in the context
                login(token);
            }
        }
        setTokenChecked(true); // Mark token check complete
    }, [accessToken, login]);

    // Always call useQuery but rely on the `skip` option to control its execution
    const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
        variables: { id: visitor?.id },
        skip: !visitor?.id, // Skip the query if no visitor ID is available
    });

    // Avoid rendering content until token check is completed
    if (!tokenChecked) {
        return <p>Checking authentication status...</p>;
    }

    if (!accessToken) {
        return <p>Please log in to view your profile.</p>;
    }

    if (loading) {
        return <p>Loading visitor information...</p>;
    }

    if (error) {
        return <p>Error loading profile information: {error.message}</p>;
    }

    const visitorData = data?.findVisitorById;

    return (
        <div>
            <h1>Profile Information</h1>
            <p><strong>is Authenticated?</strong>{isAuthenticated ? "True" : "False"}</p>
            <p><strong>ID:</strong> {visitorData.id}</p>
            <p><strong>Email:</strong> {visitorData.email}</p>
            <p><strong>First Name:</strong> {visitorData.visitor_fname || "N/A"}</p>
            <p><strong>Last Name:</strong> {visitorData.visitor_lname || "N/A"}</p>
            <p><strong>Partner&apos;s First Name:</strong> {visitorData.partner_fname || "N/A"}</p>
            <p><strong>Partner&apos;s Last Name:</strong> {visitorData.partner_lname || "N/A"}</p>
        </div>
    );
};

export default Profile;

"use client";

import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import AddNewGuest from "@/components/guest-list/addnewguest";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";

export const GET_GUESTLIST_BY_ID = gql`
  query GetGuestListById($id: String!) {
    findGuestListById(id: $id) {
      id
      name
      number
      address
      contact
      email
      status
    }
  }
`;

const GuestListPage = () => {
    const { visitor } = useAuth(); // Fetch the logged-in visitor's details
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = () => setIsPopupVisible((prev) => !prev);

    // State to hold the fetched guest list
    const [guestlists, setGuestlists] = useState<any[]>([]);

    // Fetch data using Apollo Client's useQuery hook
    const { data, loading, error } = useQuery(GET_GUESTLIST_BY_ID, {
        variables: { id: visitor?.id },
        skip: !visitor?.id, // Skip query if visitor ID is not available
        onCompleted: (data) => {
            if (data?.findGuestListById) {
                setGuestlists([data.findGuestListById]); // Populate the guest list
            }
        },
    });

    // Display a loader while data is being fetched
    if (loading) return <LoaderHelix />;

    // Handle errors gracefully
    if (error) return <p>Error loading guest list: {error.message}</p>;

    // Function to handle saving a new guest (to be implemented)
    const handleSaveGuest = (guest: { id: string; name: string; contact: string; status: string; email: string }) => {
        setGuestlists((prev) => [...prev, guest]); // Update guest list locally
    };

    return (
        <div className="py-6 font-title">
            <div className="bg-white px-4 mb-4">
                <div className="flex flex-row justify-between">
                    <div>
                        {/* Breadcrumbs */}
                        <div className="mb-4 text-black">
                            <Breadcrumbs
                                items={[
                                    { label: "Dashboard", href: "/visitor-dashboard" },
                                    { label: "Guest List", href: "/guestlist" },
                                ]}
                            />
                        </div>
                        <h1 className="text-3xl">My Guest List</h1>
                        <p>Plan your wedding guest list thoughtfully and ensure it aligns with your vision and capacity.</p>
                    </div>
                    <div className="text-center">
                        <p>Total Guests</p>
                        <p className="text-4xl">{guestlists.length}</p>
                    </div>
                </div>
            </div>

            <div className="py-6 font-title">
                <h1 className="text-3xl mb-4">Guest List</h1>
                <Button onClick={togglePopup}>Add New Guest</Button>

                {/* AddNewGuest Popup */}
                <AddNewGuest
                    isVisible={isPopupVisible}
                    onClose={togglePopup}
                    onSave={handleSaveGuest}
                />

                <div className="mt-6">
                    <h2 className="text-xl mb-2">Current Guests</h2>
                </div>

                {/* Guest List Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {guestlists.map((guest, index) => (
                            <TableRow key={guest.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{guest.name}</TableCell>
                                <TableCell>{guest.contact}</TableCell>
                                <TableCell>{guest.status}</TableCell>
                                <TableCell>{guest.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default GuestListPage;

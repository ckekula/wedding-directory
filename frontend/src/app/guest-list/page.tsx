"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { GET_VISITOR_BY_ID, FIND_GUESTLIST_BY_VISITOR } from "@/graphql/queries";
import AddNewGuest from "@/components/guest-list/addnewguest";
import EditGuest from "@/components/guest-list/editguest";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";

const GuestListPage = () => {
  const { visitor } = useAuth();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const togglePopup = () => setIsPopupVisible((prev) => !prev);
  const toggleEditPopup = () => setIsEditPopupVisible((prev) => !prev);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleSaveGuest = (guest: { name: string; }) => {
  };

  const { data:vsdata, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  const { data: gldata, loading: guestlistsLoading, error: guestlistsError } = useQuery(FIND_GUESTLIST_BY_VISITOR, {
    variables: { id: visitor?.id },
    skip: !visitor?.id, 
  });

  if (loading || guestlistsLoading)
    return (
      <div>
        <p>Loading Guest List...</p>
        <LoaderHelix />
      </div>
    );
  if (error)
    return <p>Error loading visitor information: {error.message}</p>;
  if (guestlistsError)
    return <p>Error loading guestlist: {guestlistsError.message}</p>;


  const visitorData = vsdata?.findVisitorById;
  const guestlistData = gldata?.findGuestListsByVisitor || [];

  const guestlists = guestlistData.map((guest: { id: string; name: string; number: number; status: string; contact: string; }, index: number) => ({
    no: index + 1,
    id: guest.id,
    name: guest.name,
    number: guest.number,
    status: guest.status,
    contact: guest.contact,
  }));

  const handleEditGuest = (guest: any) => {
    setSelectedGuest(guest);
    toggleEditPopup();
  };

  return (
    <div className="py-6 font-title">
      <div className="bg-white px-4 mb-4">
        <div className="flex flex-row">
          <div>
            {/* Breadcrumb */}
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
          <div className="">
            <p>Total Guests</p>
            <p className="text-4xl">150</p>
          </div>
        </div>
      </div>
      <div className="py-6 font-title">
        <h1 className="text-3xl mb-4">Guest List</h1>
        <Button onClick={togglePopup}>Add New Guest</Button>


        <div className="mt-6">
          <h2 className="text-xl mb-2">Current Guests</h2>
        </div>

        {/* AddNewGuest Popup
        <AddNewGuest
          isVisible={isPopupVisible}
          onClose={togglePopup}
          onSave={handleSaveGuest}
        /> */}
              <AddNewGuest
        isVisible={isPopupVisible}
        onClose={togglePopup}
        onSave={() => window.location.reload()}
      />
      <EditGuest
        isVisible={isEditPopupVisible}
        onClose={toggleEditPopup}
        guest={selectedGuest}
        onSave={() => window.location.reload()}
      />

      </div>

      <p>Guest List</p>
      <div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Party of</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {guestlists.map((guestlist: { no: number; id: string; name: string; number: number; status: string; contact: string; }) => (
          <TableRow key={guestlist.id}>
            <TableCell className="font-medium">{guestlist.no}</TableCell>
            <TableCell>{guestlist.name}</TableCell>
            <TableCell>{guestlist.number}</TableCell>
            <TableCell>{guestlist.status}</TableCell>
            <TableCell>{guestlist.contact}</TableCell>
            <Button onClick={() => handleEditGuest(guestlist)}>Edit</Button>
            <Button>Delete</Button>
          </TableRow>
        ))}
      </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default GuestListPage;

"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { GET_VISITOR_BY_ID, FIND_GUESTLIST_BY_VISITOR } from "@/graphql/queries";
import { DELETE_GUESTLIST } from "@/graphql/mutations";
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
} from "@/components/ui/table";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const GuestListPage = () => {
  const { visitor } = useAuth();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("");

  const togglePopup = () => setIsPopupVisible((prev) => !prev);
  const toggleEditPopup = () => setIsEditPopupVisible((prev) => !prev);

  const { data: vsdata, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  const { data: gldata, loading: guestlistsLoading, error: guestlistsError } = useQuery(FIND_GUESTLIST_BY_VISITOR, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  const [deleteGuest] = useMutation(DELETE_GUESTLIST, {
    refetchQueries: [
      { query: FIND_GUESTLIST_BY_VISITOR, variables: { id: visitor?.id } },
    ],
    onCompleted: () => {
      toast.success("Guest deleted successfully");
    },
    onError: (err) => {
      toast.error("Failed to delete guest");
    },
  });

  const handleDeleteGuest = (guestId: string) => {
    toast((t) => (
      <div>
        <p>Are you sure you want to delete this guest?</p>
        <div className="mt-2 flex justify-end gap-2">
          <Button
            onClick={() => {
              deleteGuest({ variables: { id: guestId } });
              toast.dismiss(t.id);
            }}
            className="bg-red-600 text-white hover:bg-red-500"
          >
            Yes
          </Button>
          <Button onClick={() => toast.dismiss(t.id)}>No</Button>
        </div>
      </div>
    ));
  };

  if (loading || guestlistsLoading) {
    return (
      <div>
        <p>Loading Guest List...</p>
        <LoaderHelix />
      </div>
    );
  }

  if (error) {
    return <p>Error loading visitor information: {error.message}</p>;
  }

  if (guestlistsError) {
    return <p>Error loading guestlist: {guestlistsError.message}</p>;
  }

  const guestlistData = gldata?.findGuestListsByVisitor || [];
  const guestlists = guestlistData.map(
    (guest: { id: string; name: string; number: number; status: string; contact: string }, index: number) => ({
      no: index + 1,
      id: guest.id,
      name: guest.name,
      number: guest.number,
      status: guest.status,
      contact: guest.contact,
    })
  );

  const invitedCount = guestlists.filter((guest: { status: string }) => guest.status === "Invited").length;
  const attendingCount = guestlists.filter((guest: { status: string }) => guest.status === "Attending").length;

  const filteredGuests = guestlists.filter((guest: { status: string }) => guest.status === "Attending");

  const searchGuests = guestlists.filter((guest: { name: string; status: string }) => guest.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus === "" || guest.status === filterStatus));

  const totalCount = filteredGuests.reduce((sum: number, guest: { number: string }) => {
    const partyNumber = Number(guest.number);
    return sum + (isNaN(partyNumber) ? 0 : partyNumber);
  }, 0);

  const handleEditGuest = (guest: any) => {
    setSelectedGuest(guest);
    toggleEditPopup();
  };

  return (
    <div className="py-6 font-title">
      <div className="bg-white p-4 mb-4 rounded-lg border border-gray-300">
        <div className="flex flex-row">
          <div>
            <div className="mb-4 text-black ">
              <Breadcrumbs
                items={[
                  { label: "Dashboard", href: "/visitor-dashboard" },
                  { label: "Guest List", href: "/guestlist" },
                ]}
              />
            </div>
            <h1 className="text-3xl mb-3">My Guest List</h1>
            <p className="">Plan your wedding guest list thoughtfully and ensure it aligns with your vision and capacity.</p>
          </div>
          <div className="pl-20 md:pl-60 flex flex-col pt-4 relative">
            <div className="text-center absolute right-2">
              <p className="font-body">Total Guests</p>
              <p className="text-4xl font-bold">{totalCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 mb-4 rounded-lg border border-gray-300">
        <div className="flex flex-row relative">
          <div className="text-2xl mb-4 w-1/2">Guest List</div>
          <Button className="absolute right-2 text-sm" variant="signup" size="sm" onClick={togglePopup}>Add New Guest</Button>
        </div>

        <div className="flex flex-row">
          <div className="mr-6">Total No of Guest List: {guestlists.length}</div>
          <div className="mr-6">Invited Guests: {invitedCount}</div>
          <div className="mr-6">Attending Guests: {attendingCount}</div>
        </div>

        <div className="flex flex-row mt-6">
          <div className="mr-6">
            <Input
              type="text"
              className="border rounded px-3 py-2 w-full"
              placeholder="Search Guest"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              className="border rounded px-3 py-2 w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Filter By</option>
              <option value="Invited">Invited</option>
              <option value="Not Invited">Not Invited</option>
              <option value="Attending">Attending</option>
              <option value="Declined">Declined</option>
            </select></div>
        </div>

        <div className="mt-6">
        </div>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-[100px]">No</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Party of</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchGuests.map((guestlist: { no: number; id: string; name: string; number: number; status: string; contact: string }) => (
              <TableRow key={guestlist.id}>
                <TableCell className="text-center font-medium">{guestlist.no}</TableCell>
                <TableCell className="text-center">{guestlist.name}</TableCell>
                <TableCell className="text-center">{guestlist.number}</TableCell>
                <TableCell className="text-center">{guestlist.status}</TableCell>
                <TableCell className="text-center">{guestlist.contact}</TableCell>
                <div className="pt-2">
                  <Button className="text-sm border-2 bg-orange hover:bg-white hover:text-orange hover:border-orange mr-2" onClick={() => handleEditGuest(guestlist)}>Edit</Button>
                  <Button className="text-sm border-2 bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 mr-2" onClick={() => handleDeleteGuest(guestlist.id)}>Delete</Button>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GuestListPage;

"use client";

import React, { useState } from "react";
import AddNewGuest from "@/components/guest-list/addnewguest";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const GuestListPage: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [guestList, setGuestList] = useState<{ name: string; email: string }[]>([]);

  const togglePopup = () => setIsPopupVisible((prev) => !prev);

  const handleSaveGuest = (guest: { name: string; email: string }) => {
    setGuestList((prev) => [...prev, guest]);
  };

  const guestlists = [
    {
      invoice: "INV001",
      Name: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
 ]


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

      {/* Guest List */}
      <div className="mt-6">
        <h2 className="text-xl mb-2">Current Guests</h2>
        <ul>
          {guestList.map((guest, index) => (
            <li key={index} className="mb-2">
              {guest.name} ({guest.email})
            </li>
          ))}
        </ul>
      </div>

      {/* AddNewGuest Popup */}
      <AddNewGuest
        isVisible={isPopupVisible}
        onClose={togglePopup}
        onSave={handleSaveGuest}
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
                        {guestlists.map((guestList) => (
                            <TableRow key={guestList.guestList}>
                                <TableCell className="font-medium">{guestList.no}</TableCell>
                                <TableCell>{guestList.name}</TableCell>
                                <TableCell>{guestList.party}</TableCell>
                                <TableCell>{guestList.status}</TableCell>
                                <TableCell className="text-right">{guestList.contact}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>

    </div>
  );
};

export default GuestListPage;

'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_GUESTLIST } from "@/graphql/mutations";
import { useMutation } from '@apollo/client';
import { useAuth } from "@/contexts/VisitorAuthContext";

interface AddNewGuest {
    isVisible: boolean;
    onClose: () => void;
    onSave: (guest: { name: string }) => void;
}

const AddNewGuest: React.FC<AddNewGuest> = ({ isVisible, onClose, onSave }) => {
    const { visitor } = useAuth();

    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<string>('');
    const [createGuestList, { loading }] = useMutation(CREATE_GUESTLIST);

    if (!isVisible) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const guestData = { name, number, address, contact, email, status };

            const response = await createGuestList({
                variables: {
                    input: {
                        name,
                        number,
                        address,
                        contact,
                        email,
                        status,
                        visitor_id: visitor?.id,
                    },
                },
            });

            if (response.data) {
                onSave(guestData);
                setName("");
                setNumber("");
                setAddress("");
                setContact("");
                setEmail("");
                setStatus("");
                onClose();
            }
        } catch (error) {
            console.error("Error creating guest:", error);
        }
    };


    return (
        <div className="fixed font-title inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl mb-2">Add New Guest</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="mb-4 w-3/4 mr-4">
                                <label className="block text-sm mb-1">Guest Name</label>
                                <Input
                                    type="text"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Guest Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-1">Party of</label>
                                <select
                                    className="block text-sm mb-1 border rounded px-3 py-2 w-full"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)} required>
                                    <option value="">No</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm mb-1">Address</label>
                            <input
                                type="text"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="mb-4 mr-4 w-1/2">
                                <label className="block text-sm mb-1">Contact No</label>
                                <input
                                    type="text"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Contact No"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 w-1/2">
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block text-sm mb-1">Status</label>
                            <select
                                className="block text-sm mb-1 border rounded px-3 py-2 w-full"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required>
                                <option value="">Select Status</option>
                                <option value="Invited">Invited</option>
                                <option value="Not Invited">Not Invited</option>
                                <option value="Attending">Attending</option>
                                <option value="Declined">Declined</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex space-x-2">
                        <Button type="submit" className="text-sm border-2 bg-orange hover:bg-white hover:text-orange hover:border-orange" disabled={loading}>{loading ? "Adding..." : "Add Guest"}</Button>
                        <Button className="text-sm text-black border-2 bg-slate-100 hover:bg-white hover:text-black hover:border-black " onClick={onClose}> Cancel </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddNewGuest;

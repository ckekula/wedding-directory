'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from '@apollo/client';
//import { CREATE_GUESTLIST_MUTATION } from '@/graphql/mutations';

interface AddNewGuest {
    isVisible: boolean;
    number: string;
    onClose: () => void;
    // onSave: (guest: { name: string}) => void;
}

const AddNewGuest: React.FC<AddNewGuest> = ({ isVisible, onClose, onSave }) => {
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<string>('');
  //  const [createGuestList, { loading }] = useMutation(CREATE_GUESTLIST_MUTATION);

    if (!isVisible) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const guestData = { name, number, address, contact, email, status };

        onSave(guestData);
    
        setName("");
        setNumber("");
        setAddress("");
        setContact("");
        setEmail("");
        setStatus("");

        onClose();
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl mb-2">Add New Guest</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="mb-4 w-3/4 mr-4">
                                <label className="">Guest Name</label>
                                <input
                                    type="text"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Guest Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                           
                            <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Party of</label>
                            <select
                                className="border rounded px-3 py-2 w-full"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                             </select>
                        </div>
                       

                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Address</label>
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
                                <label className="">Contact No</label>
                                <input
                                    type="text"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Contact No"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 w-1/2">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="text"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className="border rounded px-3 py-2 w-full"
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
                    <div className="flex space-x-4">
                        <Button type="submit">Add Guest</Button>
                        <Button variant="secondary" onClick={onClose}> Cancel </Button>
                    </div>
                </form>
               
            </div>
        </div>
    );
};

export default AddNewGuest;

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UPDATE_GUESTLIST } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";

export interface Guest {
    id: string;
    no: string;
    name: string;
    number: string;
    address: string;
    contact: string;
    email: string;
    status: string;
}

interface EditGuestProps {
    isVisible: boolean;
    onClose: () => void;
    guest: Guest;
    onSave: () => void;
}

const EditGuest: React.FC<EditGuestProps> = ({ isVisible, onClose, guest, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        address: "",
        contact: "",
        email: "",
        status: "",
    });

    useEffect(() => {
        if (guest) {
            setFormData({
                name: guest.name || "",
                number: guest.number || "",
                address: guest.address || "",
                contact: guest.contact || "",
                email: guest.email || "",
                status: guest.status || "",
            });
        }
    }, [guest]);

    const [updateGuestList, { loading }] = useMutation(UPDATE_GUESTLIST);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateGuestList({
                variables: {
                    id: guest.id, // Use the guest ID to identify which guest to update
                    input: {
                        number: formData.number,
                        address: formData.address,
                        contact: formData.contact,
                        email: formData.email,
                        status: formData.status,
                    },
                },
            });
            onSave(); // Callback to notify parent component of successful save
            onClose(); // Close the popup
        } catch (error) {
            console.error("Error updating guest:", error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl mb-2">Edit Guest</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="mb-4 w-3/4 mr-4">
                                <label className="block text-sm mb-1">Guest Name</label>
                                <Input
                                    className="border text-black font-bold rounded border-transparent px-3 py-2 w-full"
                                    placeholder="Guest Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-1">Party of</label>
                                <select
                                    name="number"
                                    className="block text-sm mb-1 border rounded px-3 py-2 w-full"
                                    value={formData.number}
                                    onChange={handleChange}>
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
                                name="address"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="mb-4 mr-4 w-1/2">
                                <label className="block text-sm mb-1">Contact No</label>
                                <input
                                    name="contact"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Contact No"
                                    value={formData.contact}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 w-1/2">
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    name="email"
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block text-sm mb-1">Status</label>
                            <select
                                name="status"
                                className="block text-sm mb-1 border rounded px-3 py-2 w-full"
                                value={formData.status}
                                onChange={handleChange}
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
                        <Button type="submit" className="text-sm border-2 bg-orange hover:bg-white hover:text-orange hover:border-orange" disabled={loading}>
                            {loading ? "Updating..." : "Save"}
                        </Button>
                        <Button className="text-sm text-black border-2 bg-slate-100 hover:bg-white hover:text-black hover:border-black " onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGuest;

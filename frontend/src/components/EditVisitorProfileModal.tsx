import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    firstName: string;
    lastName: string;
    partnerFirstName: string;
    partnerLastName: string;
    
    engagementDate: Date;
    weddingDate: Date;
    weddingVenue: string;
    email: string;
    password: string;
  };
  onSave: (updatedData: any) => void;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    ...profileData,
    engagementDate: new Date(profileData.engagementDate),
    weddingDate: new Date(profileData.weddingDate),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name.includes("Date") ? new Date(value) : value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-80" : "opacity-0"
        }`}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full bg-white p-8 rounded-l-2xl w-full max-w-sm shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <h2 className="text-2xl font-bold mb-4 font-title text-center">
          Edit Profile Settings
        </h2>
        <form className="my-20">
          <div className="grid grid-cols-2 gap-4 font-body">
            <div className="col-span-2 sm:col-span-1 border-black border-solid">
             
              <Input
                name="firstName"
                type="string"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
             
              <Input
                name="lastName"
                type="string"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              
              <Input
                name="partnerFirstName"
                type="string"
                placeholder="Partner&apos;s First Name"
                value={formData.partnerFirstName}
                onChange={handleChange}
                
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              
              <Input
                name="partnerLastName"
                placeholder="Partner&apos;s Last Name"
                type="string"
                value={formData.partnerLastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
             
              <Input
                name="engagementDate"
                type="date"
                placeholder="Engagement Date"
                value={formData.engagementDate.toISOString().split("T")[0]}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              
              <Input
                name="weddingDate"
                placeholder="Wedding Date"
                type="date"
                value={formData.weddingDate.toISOString().split("T")[0]}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              
              <Input
                name="weddingVenue"
                type="string"
                placeholder="Wedding Venue"
                value={formData.weddingVenue}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              
              <Input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;

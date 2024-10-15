"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { EditProfileModalProps } from "@/types/visitorProfileTypes";

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

  const handleChange = (name: string, value: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
        className={`fixed top-0 right-0 h-full bg-background p-8 rounded-l-2xl w-full max-w-[450px] shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <h2 className="text-2xl font-bold m-auto font-title text-center">
          Edit Profile Settings
        </h2>
        <form className="my-20">
          <div className="grid grid-cols-2 gap-4 font-body ">
            <div className="col-span-2 sm:col-span-1">
              <Input
                name="firstName"
                type="string"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  handleChange("firstName", e.target.value as unknown as Date)
                }
                variant="outline"
                
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                name="lastName"
                type="string"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  handleChange("lastName", e.target.value as unknown as Date)
                }
                variant="outline"
                
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                name="partnerFirstName"
                type="string"
                placeholder="Partner's First Name"
                value={formData.partnerFirstName}
                onChange={(e) =>
                  handleChange(
                    "partnerFirstName",
                    e.target.value as unknown as Date
                  )
                }
                variant="outline"
                
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                name="partnerLastName"
                placeholder="Partner's Last Name"
                type="string"
                value={formData.partnerLastName}
                onChange={(e) =>
                  handleChange(
                    "partnerLastName",
                    e.target.value as unknown as Date
                  )
                }
                variant="outline"
              />
            </div>
            <div className="col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.engagementDate
                      ? format(formData.engagementDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.engagementDate}
                    onSelect={(date) =>
                      handleChange("engagementDate", date as Date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.weddingDate
                      ? format(formData.weddingDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.weddingDate}
                    onSelect={(date) =>
                      handleChange("weddingDate", date as Date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-2">
              <Input
                name="weddingVenue"
                type="string"
                placeholder="Wedding Venue"
                value={formData.weddingVenue}
                onChange={(e) =>
                  handleChange(
                    "weddingVenue",
                    e.target.value as unknown as Date
                  )
                }
                variant="outline"
              />
            </div>
            <div className="col-span-2">
              <Input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  handleChange("email", e.target.value as unknown as Date)
                }
                variant="outline"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  handleChange("password", e.target.value as unknown as Date)
                }
                variant="outline"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-between mt-4 gap-2">
          <Button
            onClick={onClose}
            className="m-auto w-[210px] bg-accent font-body text-xl hover:bg-white hover:border-accent border-[1px] hover:text-accent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
             className="m-auto w-[210px] bg-accent font-body text-xl hover:bg-white hover:border-accent border-[1px] hover:text-accent"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;

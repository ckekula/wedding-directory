"use client";

import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AccountData } from "@/types/vendorTypes";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries";
import { UPDATE_VENDOR } from "@/graphql/mutations";
import toast from "react-hot-toast";

const EditAccount: React.FC = () => {
  const { vendor } = useVendorAuth();
  const { data, loading, error } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id: vendor?.id },
    skip: !vendor?.id,
  });

  const vendorData = data?.findVendorById;

  const [account, setAccount] = useState<AccountData>({
    email: vendorData?.email || "Your email",
    password: vendorData?.password || "",
    rePassword: vendorData?.password || ""
  });

  const [updateVendor] = useMutation(UPDATE_VENDOR, {
    onCompleted: () => {
      toast.success("Updated Successfully!");
    },
    onError: (error) => {
      toast.error("Error updating");
      console.error("Error updating vendor:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const checkPassword = () => {
    if (account.password !== account.rePassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    if (account.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor?.id) return;
    if (!checkPassword()) return;

    updateVendor({
      variables: {
        id: vendor.id,
        input: {
          email: account.email,
          password: account.password,
        },
      },
    });
  };

  if (loading) return <p>Loading vendor information...</p>;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg">
        <h2 className="font-title text-[30px] ">Account</h2>
        <hr className="w-[168px] h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit} className="mb-8">
          <div>
            <label className="font-body text-[16px] ">Email</label>
            <Input
              name="email"
              value={account.email}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">New Password</label>
            <Input
              name="password"
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <div>
            <label className="font-body text-[16px] ">Retype Password</label>
            <Input
              name="rePassword"
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>
          <Button
            variant="signup"
            className="m-3 w-full"
          >
            Save Account Information
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditAccount;

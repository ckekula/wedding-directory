"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AccountDetailsData {
  emailAddress: string;
  password: string;
  retypePassword: string;
  address: string;
}

const AccountDetails: React.FC = () => {
  // Form state to hold the account details
  const [accountDetails, setAccountDetails] = useState<AccountDetailsData>({
    emailAddress: "",
    password: "",
    retypePassword: "",
    address: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (accountDetails.password !== accountDetails.retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account details saved successfully!");
    console.log(accountDetails); // This will log the updated account details in the browser console for now
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="font-title text-[30px]">Account Details</h2>
        <hr className="w-[210px] h-px my-4 bg-gray-500 border-0 dark:bg-gray-700"></hr>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="font-body text-[16px]">Email Address</label>
            <Input
              type="email"
              name="emailAddress"
              value={accountDetails.emailAddress}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="font-body text-[16px]">Password</label>
              <Input
                type="password"
                name="password"
                value={accountDetails.password}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 mb-3"
                required
              />
            </div>
            <div>
              <label className="font-body text-[16px]">Retype Password</label>
              <Input
                type="password"
                name="retypePassword"
                value={accountDetails.retypePassword}
                onChange={handleInputChange}
                className="font-body rounded-md mt-2 mb-3"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="font-body text-[16px]">Address</label>
            <Input
              name="address"
              value={accountDetails.address}
              onChange={handleInputChange}
              className="font-body rounded-md mt-2 mb-3"
            />
          </div>

          
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
        <Button variant="signup" className="m-3 w-full">
          Save Account Details
        </Button>
      </div>
    </Fragment>
  );
};

export default AccountDetails;

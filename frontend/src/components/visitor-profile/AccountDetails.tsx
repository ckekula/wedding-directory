"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VISITOR_BY_ID } from "@/graphql/queries";
import { UPDATE_VISITOR } from "@/graphql/mutations";
import { AccountDetailsData } from "@/types/visitorProfileTypes";
import { toast } from 'react-hot-toast';

const AccountDetails: React.FC = () => {
  const { visitor } = useAuth();

  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  const visitorData = data?.findVisitorById;

  const [accountDetails, setAccountDetails] = useState<AccountDetailsData>({
    email: visitorData?.email,
    password: "",
    retypePassword: ""
  });

  const [updateVisitor] = useMutation(UPDATE_VISITOR, {
    onCompleted: () => {
      console.log("Visitor updated successfully!");
      toast.success('Account details updated successfully!', {style: {background: '#333',color: '#fff',},});
    },
    onError: (error) => {
      console.error("Error updating visitor:", error);
      toast.error('Account details update failed!', {style: {background: '#333',color: '#fff',},});
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (accountDetails.password !== accountDetails.retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    updateVisitor({
      variables: {
        id: visitor?.id,
        input: {
          email: accountDetails.email,
          password: accountDetails.password
        }
      },
    });
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error loading visitor details: {error.message}</p>;

  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex flex-col space-y-2">
          <h2 className="font-title text-2xl md:text-[30px]">Account Details</h2>
          <hr className="w-[210px] h-px bg-gray-500 border-0 dark:bg-gray-700" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="font-body text-sm md:text-base block">Email Address</label>
            <Input
              type="email"
              name="email"
              value={accountDetails.email}
              onChange={handleInputChange}
              className="font-body rounded-md w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <label className="font-body text-sm md:text-base block">Password</label>
              <Input
                type="password"
                name="password"
                value={accountDetails.password}
                onChange={handleInputChange}
                className="font-body rounded-md w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="font-body text-sm md:text-base block">Retype Password</label>
              <Input
                type="password"
                name="retypePassword"
                value={accountDetails.retypePassword}
                onChange={handleInputChange}
                className="font-body rounded-md w-full"
                required
              />
            </div>
          </div>

          <div className="text-center p-4  mt-8">
            <Button
              variant="signup"
              className="w-full md:max-w-md mx-auto p-2.5"
              type="submit"
            >
              Save Account Details
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AccountDetails;
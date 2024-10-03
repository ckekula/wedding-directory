"use client";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VISITOR_BY_ID } from "@/api/graphql/queries";
import { UPDATE_VISITOR } from "@/api/graphql/mutations";
import { AccountDetailsData } from "@/types/visitorProfileData";

const AccountDetails: React.FC = () => {

  const { visitor } = useAuth();

  // Fetch visitor data from the server using the visitor ID
  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id, // Skip query if visitor ID is not available
  });

  const visitorData = data?.findVisitorById;

  const [accountDetails, setAccountDetails] = useState<AccountDetailsData>({
    email: visitorData?.email,
    password: "",
    retypePassword: ""
  });

  // Mutation for updating visitor details
  const [updateVisitor] = useMutation(UPDATE_VISITOR, {
    onCompleted: () => {
      // Optionally handle success (e.g., show a message, redirect, etc.)
      console.log("Visitor updated successfully!");
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Error updating visitor:", error);
    },
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading visitor details: {error.message}</p>;

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
              name="email"
              value={accountDetails.email}
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
          <div className="bg-white rounded-2xl p-4 px-8 shadow-lg my-8 justify-center flex">
            <Button variant="signup" className="m-3 w-full" type="submit">
              Save Account Details
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AccountDetails;

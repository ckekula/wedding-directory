// pages/checklist/index.tsx
"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/apollo-client";
import Breadcrumbs from "@/components/Breadcrumbs";


const ChecklistPage = () => {
  return (
    <ApolloProvider client={client}>
      <div className="py-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/visitor-dashboard" },
              { label: "Checklist", href: "/visior-dashboard/checklist" },
            ]}
          />
        </div>

        {/* Page Title */}
        <div className="text-center mb-8 ">
          <h1 className="text-3xl font-bold text-slate-800 font-title">
            Your Checklist
          </h1>
          <p className="text-slate-600 text-lg font-merriweather">
            Stay organized and stress-free
          </p>
        </div>
        <hr className="border-t-[3px] border-slate-600 my-4" />

      
      </div>
    </ApolloProvider>
  );
};

export default ChecklistPage;

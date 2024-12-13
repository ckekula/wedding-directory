"use client"
import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react'
import Checklist from "../../components/checklist/Checklist";
import categoriesData from "../../utils/cheklist-task.json";
import { TaskCategory } from "../../types/taskTypes";

const page = () => {
  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/visitor-dashboard" },
            { label: "Cheklist", href: "/cheklist" },
          ]}
        />
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cheklist</h1>
        <p className="text-gray-600">
          Plan your wedding expenses effectively and stay within budget.
        </p>
      </div>
      <Checklist categories={categoriesData as TaskCategory[]} />
    </div>
  );
}

export default page
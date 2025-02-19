"use client";
import React from 'react';
import { Check } from "lucide-react";
import { useQuery } from '@apollo/client';
import { FIND_PACKAGES_BY_OFFERING } from '@/graphql/queries';
import { useParams } from 'next/navigation';

interface Package {
  id: string;
  name: string;
  description: string;
  pricing: number;
  features: string[];
}

interface PackageDetailsProps {
  name: string;
  description: string;
  pricing: number;
  features: string[];
}

const Packages = () => {
  const params = useParams();
  const offeringId = params.id as string;

  const { loading, error, data } = useQuery(FIND_PACKAGES_BY_OFFERING, {
    variables: { offeringId },
  });

  const PackageDetails: React.FC<PackageDetailsProps> = ({ name, description, pricing, features }) => (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-500 mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold">{pricing.toLocaleString()}</span>
          <span className="text-gray-500 ml-1">LKR</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Features:</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (loading) return <div className="p-4">Loading packages...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading packages: {error.message}</div>;
  if (!data?.findPackagesByOffering?.length) return <div className="p-4">No packages available</div>;

  return (
    <div className="w-full max-w-7xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.findPackagesByOffering.map((pkg: Package) => (
          <PackageDetails 
            key={pkg.id} 
            name={pkg.name}
            description={pkg.description}
            pricing={pkg.pricing}
            features={pkg.features}
          />
        ))}
      </div>
    </div>
  );
};

export default Packages;
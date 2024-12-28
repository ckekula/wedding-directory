import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import VendorCard from '@/components/visitor-dashboard/my-vendors/VendorCard';

interface CategoryDropdownProps {
  category: string;
  isExpanded: boolean;
  onToggle: (category: string) => void;
  loading: boolean;
  vendors: any[];
}

const CategoryDropdown = ({ 
  category, 
  isExpanded, 
  onToggle, 
  loading, 
  vendors 
}: CategoryDropdownProps) => {
  const hasVendors = vendors.length > 0;

  return (
    <div className="w-full mb-4">
      <button
        onClick={() => onToggle(category)}
        className={`w-full p-4 rounded-t-lg shadow-sm flex justify-between items-center transition-colors ${
          isExpanded ? 'bg-black/50 text-white rounded-b-none' : 'bg-white hover:bg-orange/10 rounded-lg'
        }`}
      >
        <span className="font-semibold">{category}</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-b-lg border-x border-b">
          {loading ? (
            <p className="text-center text-gray-500">Loading vendors...</p>
          ) : hasVendors ? (
            vendors.map((vendor: any) => (
              <VendorCard
                key={vendor.offering.id}
                name={vendor.offering.name}
                vendor={vendor.offering.vendor?.busname || "Vendor name not available"}
                city={vendor.offering.vendor?.city || "Location not available"}
                banner={vendor.offering.banner || "/images/default-banner.jpg"}
                link={`/services/${vendor.offering.id}`}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No vendors saved in this category</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
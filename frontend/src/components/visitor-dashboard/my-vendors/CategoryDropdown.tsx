import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import VendorCard from '@/components/visitor-dashboard/my-vendors/VendorCard';
import { CategoryDropdownProps } from '@/types/myVendorsTypes';

const CategoryDropdown = ({ 
  category, 
  isExpanded, 
  onToggle, 
  loading, 
  vendors 
}: CategoryDropdownProps) => {
  // Filter vendors to only show offerings in this category
  const offeringsInCategory = vendors.filter(
    (myVendor) => myVendor.offering.category === category
  );
  
  const hasOfferings = offeringsInCategory.length > 0;

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
            <p className="text-center text-gray-500">Loading offerings...</p>
          ) : hasOfferings ? (
            offeringsInCategory.map((myVendor) => (
              <VendorCard
                key={myVendor.offering.id}
                name={myVendor.offering.name}
                vendor={myVendor.offering.vendor?.busname || "Vendor name not available"}
                city={myVendor.offering.vendor?.city || "Location not available"}
                banner={myVendor.offering.banner || "/images/bride.webp"}
                link={`/services/${myVendor.offering.id}`}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No saved offerings in this category</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
import React from "react";
import { HiOutlineBriefcase } from "react-icons/hi2";
import Image from "next/image";
import ActionButton from "../common/ActionButton";
import EmptyStateDisplay from "../common/EmptyStateDisplay";

interface Vendor {
  id: string;
  offering: {
    name?: string;
    banner?: string;
    vendor?: {
      busname?: string;
    };
  };
}

interface VendorWidgetProps {
  vendors: Vendor[];
  visitorId: string | undefined;
}

const VendorWidget: React.FC<VendorWidgetProps> = ({ vendors, visitorId }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-100">
        <h3 className="font-title text-xl font-semibold flex items-center text-gray-800">
          <HiOutlineBriefcase className="mr-3 h-5 w-5 text-orange-500" />
          My Vendors
        </h3>
      </div>
      <div className="p-6 font-body font-normal">
        <p className="text-gray-600 mb-5">
          Track and manage your selected wedding vendors.
        </p>
        {vendors && vendors.length > 0 ? (
          <div className="space-y-4 mb-5">
            {vendors.slice(0, 2).map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center border-b border-gray-100 pb-3 group"
              >
                <div className="h-12 w-12 rounded-full overflow-hidden bg-orange-50 mr-4 flex-shrink-0 ring-2 ring-orange-100">
                  {vendor.offering?.banner ? (
                    <Image
                      src={vendor.offering.banner}
                      alt={vendor.offering?.name || "Vendor"}
                      width={60}
                      height={60}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-orange-400 font-medium">
                      {vendor.offering?.name
                        ? vendor.offering.name.charAt(0)
                        : "?"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-gray-800">
                    {vendor.offering?.name || "Unnamed Vendor"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {vendor.offering?.vendor?.busname || "No business name"}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <EmptyStateDisplay
            Icon={HiOutlineBriefcase}
            message="No vendors added yet"
          />
        )}
        <ActionButton
          href={`/visitor-dashboard/my-vendors/${visitorId}`}
          label={
            vendors.length > 0
              ? `View all vendors (${vendors.length})`
              : "Find vendors"
          }
        />
      </div>
    </div>
  );
};

export default VendorWidget;

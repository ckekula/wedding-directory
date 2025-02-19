import React, { Fragment } from "react";
import Header from "@/components/shared/Headers/Header";

const VendorDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {/* Container for the header */}
      <div className="container mx-auto px-4">
        <Header />
      </div>

      {/* Main content with background color */}
      <div className="bg-lightYellow min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* Content injected dynamically */}
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default VendorDashboardLayout;

"use client";

import GeneralHeader from "./GeneralHeader";
import DashBoardHeader from "./VisitorHeader";
import VendorHeader from "./VendorHeader";
import { useAuth as VisitorAuth } from "@/contexts/VisitorAuthContext";
import { useVendorAuth as VendorAuth } from "@/contexts/VendorAuthContext";

const Header = () => {
  const { visitor } = VisitorAuth();
  const { vendor } = VendorAuth();

  if (visitor) {
    return <DashBoardHeader />;
  } else if (vendor) {
    return <VendorHeader />;
  }else{
    return <GeneralHeader />
  }
};

export default Header;

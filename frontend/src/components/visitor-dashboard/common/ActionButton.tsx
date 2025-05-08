import React from "react";
import Link from "next/link";
import { CgMore } from "react-icons/cg";

interface ActionButtonProps {
  href: string;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 font-medium text-sm shadow-sm"
    >
      <span>{label}</span>
      <span className="ml-1.5 transform transition-transform group-hover:translate-x-1">
        <CgMore />
      </span>
    </Link>
  );
};

export default ActionButton;

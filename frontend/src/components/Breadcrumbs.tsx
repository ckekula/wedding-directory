// components/shared/Breadcrumbs.tsx
import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-slate-800 font-title hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-600">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

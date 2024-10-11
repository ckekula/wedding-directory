"use client";
import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface AccordionItemBlockProps {
  title: string;
  description: string;
}

const AccordionItemBlock: React.FC<AccordionItemBlockProps> = ({ title, description }) => {
  return (
    <AccordionItem value={title.toLowerCase()} className="bg-white shadow-lg px-7 pb-7 rounded-xl">
      <AccordionTrigger className="text-left mb-1">
        <div className="flex flex-col">
          <h3 className="font-title text-3xl">{title}</h3>
          <p className="text-sm font-body">{description}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-sm font-body"></AccordionContent>
    </AccordionItem>
  );
};

export default AccordionItemBlock;

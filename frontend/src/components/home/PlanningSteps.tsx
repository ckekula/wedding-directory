import React from "react";
import Image from "next/image";
import Link from "next/link";
import leftImage from "../../assets/images/bridaldressing.jpg";
import { Button } from "../ui/button";
const PlanningSteps = () => {
  const cards = [
    {
      id: 1,
      tagLine: "sample tag line",
      title: "Your Vendors",
      description:
        "sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text",
      buttonText: "Get Started",
      image: "/venue.jpg",
    },
    {
      id: 2,
      tagLine: "sample tag line",
      title: "Your Budget",
      description:
        "sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text",
      buttonText: "Get Started",
      image: "/cakes.jpg",
    },
    {
      id: 3,
      tagLine: "sample tag line",
      title: "Your Checklist",
      description:
        "sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text",
      buttonText: "Get Started",
      image: "/florists.jpg",
    },
  ];
  return (
    <section className="flex justify-center py-16 bg-white">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-5xl font-bold font-title mb-8 text-center">
          Wedding planning has never been easy
        </h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-2/5 p-4">
            <Image
              src={leftImage}
              alt="Wedding Planning"
              className="rounded-lg"
              layout="responsive"
              width={500}
              height={750}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-between space-y-6 md:space-y-8 lg:space-y-10 p-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex items-center space-x-4 p-4 border rounded-lg shadow-lg"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="rounded-lg "
                  width={100}
                  height={100}
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold font-body">
                    {card.title}
                  </h3>
                  <p className="text-sm font-body p-4">{card.description}</p>
                  <Link href="/sign-up">
                    <Button variant="ornageOutline" className="pt-2 font-body">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningSteps;

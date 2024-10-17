import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const cards = [
  {
    id: 1,
    tagLine: "sample tag line",
    title: "Your Vendors",
    description:
      "We'll help you find the perfect vendors for your wedding, tailored to your specific needs!",
    buttonText: "Get Started",
    image: "/images/venue.webp",
  },
  {
    id: 2,
    tagLine: "sample tag line",
    title: "Your Budget",
    description:
      "Setup your budget and manage your finances with our easy-to-use budgeting tool!",
    buttonText: "Get Started",
    image: "/images/cakes.webp",
  },
  {
    id: 3,
    tagLine: "sample tag line",
    title: "Your Checklist",
    description:
      "We'll walk you through every part of planning, so you can plan your big day in no time!",
    buttonText: "Get Started",
    image: "/images/florists.webp",
  },
];

const PlanningSteps = () => {

  return (
    <section className="flex justify-center py-16 bg-white">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-5xl font-bold font-title mb-8 text-center">
          Wedding planning has never been easier
        </h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-2/5 p-4">
            <Image
              src='/images/bridaldressing.webp'
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
                  <Link href="#">
                    <Button variant="ornageOutline" className="pt-2 font-body">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-5xl font-bold font-title mb-8 text-center mt-8">Join with Say I Do</h2>
        <Button variant="signup">
          <Link href={'#'}>Sign up with us for free</Link>
        </Button>
      </div>
    </section>
  );
};

export default PlanningSteps;

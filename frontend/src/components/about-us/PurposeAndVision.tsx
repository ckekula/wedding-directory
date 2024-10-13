import React from "react";

const PurposeAndVision: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row py-6 gap-12 container justify-between items-stretch w-full mx-auto px-0">
      <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <div className="font-bold font-title text-2xl mb-2">Our Purpose</div>
        <p>
          At Sayido.lk, our purpose is to bring people together, inspire love,
          and create memorable wedding experiences. We aim to simplify the
          wedding planning journey for couples across Sri Lanka, connecting them
          with the best vendors and venues in the country.
        </p>
      </div>
      <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <div className="font-bold font-title text-2xl mb-2">Our Mission</div>
        <p>
          Our mission is to make wedding planning a stress-free and enjoyable
          experience for every couple. By leveraging innovative tools, expert
          guidance, and a curated network of professionals, we help couples plan
          the wedding of their dreams with ease.
        </p>
      </div>
    </div>
  );
};

export default PurposeAndVision;

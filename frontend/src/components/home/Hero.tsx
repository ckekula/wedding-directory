import Image from "next/image";

//components
import SearchBar from "../shared/SearchBar";

const Hero = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px]">
      <Image
        src="/images/hero.webp"
        fill
        className="object-cover w-full h-full"
        alt="hero image"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text and Search Bar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 md:p-0">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold font-title leading-tight">
          Plan your wedding hassle-free with us!
        </h1>

        <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl font-body leading-snug">
          Search, add to the checklist, and plan your wedding!
        </p>

        <div className="mt-6 sm:mt-8 w-full max-w-md">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;

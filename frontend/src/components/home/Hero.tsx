import Image from "next/image";

//components
import SearchBar from "../shared/SearchBar";

const Hero = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[600px]">
      <Image
        src="/images/hero.webp"
        fill
        className="object-cover w-full h-full"
        alt="hero image"
      />
      <div className=" absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-2xl md:text-5xl font-bold font-title">
          Plan your wedding Hassle free with Us!
        </h1>
        <p className="mt-4 text-lg md:text-xl font-body">
          Search, Add to the checklist and Plan your Wedding!
        </p>
        <div className="mt-8">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;

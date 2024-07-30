import Image from "next/image";

//components
import SearchBar from "./shared/SearchBar";

const Hero = () => {
  return (
    <div className=" relative w-full h-auto">
      <Image
        src="/hero.jpg"
        layout="responsive"
        width={1440}
        height={560}
        className="hidden md:block"
        alt="hero image"
      />
      <div className="absolute inset-0 flex flex-col items-center pt-40 text-white text-center">
        <h1 className="text-4xl font-bold font-title">
          Plan Your Wedding Hassel Free With Us!
        </h1>
        <p className="mt-4 text-xl font-body">
          Search, Add to the checklist and Plan your Wedding!
        </p>
        <SearchBar/>
      </div>
    </div>
  );
};

export default Hero;

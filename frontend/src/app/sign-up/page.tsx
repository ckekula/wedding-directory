import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Headers/Header";
import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Header />

      <div className="relative z-10 w-full h-[1000px] md:h-[800px]">
        <Image
          src="/login-signup.jpg"
          layout="fill"
          objectFit="cover"
          alt="sign image"
        />
        <div className="absolute inset-0 font-body">
          <div className='flex flex-col justify-center items-center text-center'>
            <div><p className="mt-8 w-full">tag line</p></div>
            <div><h1 className="font-title font-bold text-3xl w-full ">Welcome Vendors</h1></div>
            <div className='bg-white bg-opacity-70 mt-6 w-[350px] md:w-[600px] border-solid border-black border-2 border-opacity-60 rounded-md p-8' >
              <h1 className='text-text mx-[30px] md:mx-[90px] text-2xl font-bold text-center font-title'>Connect with couples to make their dream wedding come true!</h1>
              <form>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 w-full items-center gap-x-12 gap-y-5">
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" id="fname" placeholder="First Name" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" id="lname" placeholder="Last Name" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" id="bname" placeholder="Businees Name" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Select>
                      <SelectTrigger className="h-8" id="bcategory">
                        <SelectValue placeholder="Business Category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="photo">Photography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" id="phone" placeholder="Phone" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" type="email" id="email" placeholder="Email" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Select>
                      <SelectTrigger className="h-8" id="district">
                        <SelectValue placeholder="District" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="gampaha">Gampaha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" id="postalcode" placeholder="Postal Code" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" type="password" id="password" placeholder="Password" />
                  </div>
                  <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                    <Input className="h-8" type="password" id="rpassword" placeholder="Retype Password" />
                  </div>
                </div>
                <div className="mt-6 flex space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-left leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    By submitting and sharing your information, you agree to the{' '}
                    <Link href="/" className="underline">
                      terms of use
                    </Link>{' '}
                    and{' '}
                    <Link href="/" className="underline ">
                      privacy policy
                    </Link>{' '}
                    of Say I Do.
                  </label>
                </div>
                <div className=" border-black rounded-md border-2 mt-6 flex flex-col w-full border-solid  bg-primary ">
                  <Button className="rounded-none text-black font-bold hover:bg-primary bg-primary text-xl">Register Now</Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  );
};

export default page;

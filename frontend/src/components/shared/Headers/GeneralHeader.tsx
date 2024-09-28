"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { Fragment, useState } from "react";
//components
import Nav from "../Nav";
import VisitorSignup from "../VisitorSignup";
import VisitorLogin from "../VisitorLogin";

const GeneralHeader = () => {
  const [showVisitorSignup, setShowVisitorSignup] = useState(false);
  const [showVisitorLogin, setShowVisitorLogin] = useState(false);
  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-black bg-white">
        <div className="container mx-auto flex justify-between items-center ">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/">
              <h1 className=" text-2xl font-bold text-black font-title">
                Say I Do
              </h1>
            </Link>
          </div>

          {/*desktop nav */}
          <div className="flex-1 hidden xl:flex items-center justify-center">
            <Nav />
          </div>
          <div className="flex-1 flex items-center justify-end gap-8 text-xl">
            <Link href="help" className="font-title ">
              Help
            </Link>

            <Button variant="login" onClick={() => setShowVisitorLogin(true)}>
              Login
            </Button>

            <Button variant="signup" onClick={() => setShowVisitorSignup(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>
      <VisitorSignup
        isVisible={showVisitorSignup}
        onClose={() => setShowVisitorSignup(false)}
      />
      <VisitorLogin
        isVisible={showVisitorLogin}
        onClose={() => setShowVisitorLogin(false)}
      />
    </Fragment>
  );
};

export default GeneralHeader;

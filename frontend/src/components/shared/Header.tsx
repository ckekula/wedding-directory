"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Fragment, useState } from "react";
//components
import Nav from "../shared/Nav";
import VisitorSignup from "./VisitorSignup";
import VisitorLogin from "./VisitorLogin";


const Header = () => {

  const [showVisitorSignup, setShowVisitorSignup] = useState(false);
  const [showVisitorLogin, setShowVisitorLogin] = useState(false);
  return (
    <Fragment>
      <header className="py-6 xl:py-6 text-accent bg-white">
        <div className="container mx-auto flex justify-between items-center ">
          {/* Logo */}
          <Link href="/>">
            <h1 className=" text-2xl font-bold text-accent font-title">
              Say I Do
            </h1>
          </Link>

         

          {/*desktop nav */}
          <div className="hidden xl:flex items-center gap-8">
            <Nav />
          </div>
          <div className=" text-xl flex items-center justify-center gap-8 font-bold">
            <Link href="help" className="font-title font-bold">
              Help
            </Link>
            {/*}  <Link href="/login" >
              <Button variant="login">Login</Button>
              </Link>
           <Link href="/sign-up">

           {*/}

            <Button variant="login" onClick={() => setShowVisitorLogin(true)}>Login</Button>

            <Button variant="signup" onClick={() => setShowVisitorSignup(true)}>Sign Up</Button>
          </div>
        </div>
      </header>
      <VisitorSignup isVisible={showVisitorSignup} onClose={() => setShowVisitorSignup(false)} />
      <VisitorLogin isVisible={showVisitorLogin} onClose={() => setShowVisitorLogin(false)} />
    </Fragment>
  );
};

export default Header;

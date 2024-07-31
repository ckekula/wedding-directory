import Link from "next/link";
import { Button } from "../ui/button";

//components
import Nav from "../shared/Nav";

const Header = () => {
  return (
    <header className="py-6 xl:py-6 text-accent bg-background">
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
        <div className=" text-xl flex items-center justify-center gap-8">
          <Link href="help" className="font-title">
            Help
          </Link>
          <Link href="/login">
            <Button variant="login">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="signup">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

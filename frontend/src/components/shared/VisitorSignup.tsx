import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import VisitorLogin from "./VisitorLogin";

interface VisitorSignupProps {
    isVisible: boolean
    onClose: () => void
}

const VisitorSignup : React.FC<VisitorSignupProps> = ({ isVisible, onClose }) => {

    const [showVisitorLogin, setShowVisitorLogin] = useState(false);
    if (!isVisible) return null;

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'wrapper') onClose();
    }

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className='bg-white mt-6 w-[450px] rounded-md p-8 font-body' >
                <h1 className=' mx-[100px]  text-3xl font-bold text-center font-title'>Welcome to Say I Do</h1>
                <form>
                    <div className="mt-12 grid grid-cols-1 w-full items-center gap-x-12 gap-y-5">
                        <div className="border-black border-solid border-2 border-opacity-70 rounded-md flex flex-row space-y-1.5">
                            <Input className="h-12 pl-6 pb-3" type="email" id="email" placeholder="Email Address" />
                        </div>
                        <div className="border-black border-solid border-2 border-opacity-70 rounded-md flex flex-row space-y-1.5">
                            <Input className="h-12 pl-6 pb-3" type="password" id="password" placeholder="Password" />
                        </div>

                    </div>
                    <div className="mt-9 flex space-x-2 items-center justify-center">
                        <Checkbox id="terms" />
                        <label

                            className="text-sm text-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Send me wedding tips, ideas and special offers

                        </label>
                    </div>
                    <div className="  mt-6 flex flex-col w-full ">
                        <Button className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg">Sign Up</Button>
                    </div>
                    <div className='text-center mt-3'>
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Already have an account?{' '}
                            <Link
                                href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowVisitorLogin(true);
                                }}
                                className="underline"
                            >
                                Sign In
                            </Link>

                        </label>
                    </div>
                    <div className='text-center mt-2'>
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Are you a wedding service provider?{' '}
                            <Link href="/login" className="underline">
                                Start from here
                            </Link>
                        </label>
                    </div>
                    <div className='text-center mt-2'>
                        <label
                            htmlFor="terms"
                            className="text-sm text-left leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            By clicking &quot;Sign Up&quot;, you agree to the Wedding Planner&apos;s {' '}
                            <Link href="/" className="underline">
                                Terms of Use
                            </Link>
                        </label>
                    </div>
                </form>
            </div>
            <VisitorLogin isVisible={showVisitorLogin} onClose={() => setShowVisitorLogin(false)} />
        </div>
    )
}

export default VisitorSignup

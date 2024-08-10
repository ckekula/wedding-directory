import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import VisitorSignup from './VisitorSignup';


const VisitorLogin = ({ isVisible, onClose }) => {

    const [showVisitorSignup, setShowVisitorSignup] = useState(false);
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    }

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
            <div className='bg-white mt-6 w-[450px] rounded-md p-8 font-body' >
                <h1 className=' text-4xl font-bold text-center font-title'>Start where you left off</h1>
                <form>
                    <div className="mt-12 grid grid-cols-1 w-full items-center gap-x-12 gap-y-5">
                        <div className="border-black border-solid border-2 border-opacity-70 rounded-md flex flex-row space-y-1.5">
                            <Input className="h-12 pl-6 pb-3" type="email" id="email" placeholder="Email Address" />
                        </div>
                        <div className="border-black border-solid border-2 border-opacity-70 rounded-md flex flex-row space-y-1.5">
                            <Input className="h-12 pl-6 pb-3" type="password" id="password" placeholder="Password" />
                        </div>

                    </div>
                    <div className="  mt-6 flex flex-col w-full ">
                        <Button className="rounded-none text-black font-bold hover:bg-primary bg-primary text-lg">Log In</Button>
                    </div>
                    <div className='text-center mt-2'>
                        <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Forget your password?
                        </label>
                    </div>
                    <hr className="border-t-2 border-gray-300 my-4" />
                    <div className='text-center mt-3'>
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Don&apos;t have an account?{' '}
                            <Link
                                href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowVisitorSignup(true);
                                }}
                                className="underline"
                            >
                                Sign Up
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
                </form>
            </div>
            <VisitorSignup isVisible={showVisitorSignup} onClose={() => setShowVisitorSignup(false)} />
        </div>
    )
}

export default VisitorLogin

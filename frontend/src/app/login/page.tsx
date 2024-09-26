'use client';
import React, { useState } from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router"; // If you're using app directory, use next/navigation instead
import { useVisitor } from "@/contexts/VisitorAuthContext"; // Import the Visitor context

const LoginPage = () => {
    const router = useRouter();
    const { login, error, isAuthenticated, loading } = useVisitor(); // Access login function and other state from context

    // State to store form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page refresh

        try {
            console.log("Email:", email);
            console.log("Password:", password);

            // Call the login function from the context
            await login(email, password);

            // Check if the user is authenticated and redirect accordingly
            if (isAuthenticated) {
                console.log("Login successful");
                router.push("/dashboard"); // Redirect to the dashboard or protected route
            } else {
                console.log("Authentication failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            // Error handling can also be displayed in the UI if needed
        }
    };

    return (
        <div>
            <Header />
            <div className="relative z-10 w-full h-[500px] md:h-[650px]">
                <Image
                    src="/login-signup.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="sign image"
                />
                <div className="absolute inset-0 font-body">
                    <div className="flex flex-col justify-center items-center text-center">
                        <div className="bg-white bg-opacity-70 my-8 md:mt-20 w-[350px] md:w-[400px] border-solid border-black border-2 border-opacity-60 rounded-md p-8">
                            <h1 className="text-text mx-[20px] text-3xl font-bold text-center font-title">
                                Login to your account
                            </h1>
                            {/* Form Element */}
                            <form onSubmit={handleSubmit}>
                                <div className="mt-6 flex space-x-2 justify-center">
                                    <label
                                        htmlFor="terms"
                                        className="text-lg text-left leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Enter your username and password{" "}
                                    </label>
                                </div>
                                <div className="mt-6 grid grid-cols-1 w-full items-center gap-x-12 gap-y-5">
                                    <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                                        <Input
                                            className="h-8"
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} // Capture email input
                                            required
                                        />
                                    </div>
                                    <div className="border-black border-solid border-2 rounded-lg flex flex-row space-y-1.5">
                                        <Input
                                            className="h-8"
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // Capture password input
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-500 mt-2 text-sm">
                                        {error} {/* Show error message from context */}
                                    </div>
                                )}

                                <div className="border-black rounded-md border-2 mt-6 flex flex-col w-full border-solid bg-primary">
                                    <Button
                                        type="submit" // This ensures the form submission is handled properly
                                        className="rounded-none text-black font-bold hover:bg-primary bg-primary text-xl"
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? "Logging in..." : "Login"} {/* Show loading state */}
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-6 flex space-x-2 justify-center">
                                <label
                                    htmlFor="terms"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    <Link href="/">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="mt-6 flex space-x-2 justify-center">
                                <label
                                    htmlFor="terms"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Don&apos;t have an account?
                                    <Link href="/sign-up" className="underline">
                                        Register Here
                                    </Link>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LoginPage;


import type { Metadata } from "next";
import { AuthProvider as VisitorAuthProvider } from "@/contexts/VisitorAuthContext";
import ApolloWrapper from "@/apollo/ApolloWrapper";
import { Montserrat, Merriweather, Montez, Outfit } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { VendorAuthProvider } from "@/contexts/VendorAuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Say I Do",
  description: "Crafting Timeless Celebrations ",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

const montez = Montez({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-montez",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100","400","700"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />

      <body
        className={`${montserrat.variable} ${merriweather.variable} ${montez.variable} ${outfit.variable}`}
      >
        <ApolloWrapper>
          {/* Wrapping the application with VisitorProvider */}
          <VisitorAuthProvider>
            <VendorAuthProvider>
              <PageTransition>
                {children}
                <Toaster reverseOrder={false} />
              </PageTransition>
            </VendorAuthProvider>
            {/* PageTransition can wrap around the children to handle animations */}
          </VisitorAuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

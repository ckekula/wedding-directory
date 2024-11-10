import type { Metadata } from "next";
import { AuthProvider as VisitorAuthProvider } from "@/contexts/VisitorAuthContext";
import ApolloWrapper from "@/apollo/ApolloWrapper";
import { Montserrat, Merriweather, Montez, Outfit, Marck_Script } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { VendorAuthProvider } from "@/contexts/VendorAuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Say I Do",
  description: "Crafting Timeless Celebrations ",
  icons : {
    icon : "/favicon.ico"}
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

const marck_Script = Marck_Script({
  subsets: ["latin-ext"],
  style:["normal"],
  weight: ["400"],
  variable: "--font-marck-script",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      

      <body
        className={`${montserrat.variable} ${merriweather.variable} ${montez.variable} ${outfit.variable} ${marck_Script.variable}`}
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

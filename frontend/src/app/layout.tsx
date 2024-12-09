import type { Metadata } from "next";
import { AuthProvider as VisitorAuthProvider } from "@/contexts/VisitorAuthContext";
import ApolloWrapper from "@/apollo/ApolloWrapper";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { VendorAuthProvider } from "@/contexts/VendorAuthContext";
import { Toaster } from "react-hot-toast";

import localFont from "next/font/local";

const montserratFont = localFont({
    src: [
      {
        path: "./fonts/Montserrat-Thin.ttf",
        weight: "100",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-ExtraLight.ttf",
        weight: "200",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Light.ttf",
        weight: "300",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Regular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Medium.ttf",
        weight: "500",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-SemiBold.ttf",
        weight: "600",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Bold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-ExtraBold.ttf",
        weight: "800",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Black.ttf",
        weight: "900",
        style: "normal",
      },
    ],
    variable: "--font-montserrat",
    
});

const merriweatherFont = localFont({
    src: [
      {
        path: "./fonts/Merriweather-Light.ttf",
        weight: "300",
        style: "normal",
      },
      {
        path: "./fonts/Merriweather-Regular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/Merriweather-Bold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "./fonts/Merriweather-Black.ttf",
        weight: "900",
        style: "normal",
      },
    ],
    variable: "--font-merriweather",
    
});
  
const montezFont = localFont({
    src: [
      {
        path: "./fonts/Montez-Regular.ttf",
        weight: "400",
        style: "normal",
      },
    ],
    variable: "--font-montez",
    
});
  
const outfitFont = localFont({
    src: [
      {
        path: "./fonts/Outfit-Thin.ttf",
        weight: "100",
        style: "normal",
      },
      {
        path: "./fonts/Outfit-Regular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/Outfit-Bold.ttf",
        weight: "700",
        style: "normal",
      },
    ],
    variable: "--font-outfit",
  
});
  
const marckScriptFont = localFont({
    src: [
      {
        path: "./fonts/MarckScript-Regular.ttf",
        weight: "400",
        style: "normal",
      },
    ],
      variable: "--font-marck-script",
    display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sayido.lk"),
  title: "Say I Do",
  description: "Your central hub for all things wedding",
  icons : {
    icon : "/favicon.ico"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sayido.lk",
    title: "Say I Do",
    description: "Your central hub for all things wedding-related",
    siteName: "Say I Do",
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "Say I Do - Your central hub for all things wedding",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>

      <body
        className={`${montserratFont.variable} ${merriweatherFont.variable} ${montezFont.variable} ${outfitFont.variable} ${marckScriptFont.variable}`}
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

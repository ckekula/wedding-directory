import type { Metadata } from "next";
import { AuthProvider as VisitorAuthProvider } from "@/contexts/VisitorAuthContext";
import ApolloWrapper from "@/apollo/ApolloWrapper";
import { montserrat, merriweather, montez } from "@/assets/fonts/fonts";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { VendorAuthProvider } from '@/contexts/VendorAuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Say I Do",
  description: "Crafting Timeless Celebrations ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
        <link rel="icon" href="/favicon.ico" />
      
      <body
        className={`${montserrat.variable} ${merriweather.variable} ${montez.variable}`}
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

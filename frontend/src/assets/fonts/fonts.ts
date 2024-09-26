import { Montserrat, Merriweather, Montez } from "next/font/google";

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
});
  
export  const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    variable: "--font-merriweather",
});
  
export const montez = Montez({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-montez",
});
/**
 * @ToDo  TO be removed as we dont use this, but need to check it infuture
 */
import { Fredoka as FontSans } from "next/font/google";

import "../globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "../Sections";

/**
 * @ToDo  TO be removed as we dont use this, but need to check it infuture
 */
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kindi Education",
  description: "Built by ClaraVerse",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
    
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}

          <Footer />
        </body>
      </html>
    </>
  );
}

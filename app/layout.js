"use client";

import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  SplashScreenHandler,
  StatusBarManager,
  VideoOpeningScreen,
} from "./Sections";
import { useState } from "react";

// export const metadata = {
//   title: "Kindi Learning",
//   description: "Play • Learn • Grow • Thrive • Play",
// };

export default function RootLayout({ children }) {
  const [isVideoVisible, setIsVideoVisible] = useState(true);

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Gloria+Hallelujah&family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("min-h-screen  bg-background font-sans antialiased")}>
        {isVideoVisible && (
          <VideoOpeningScreen onFinished={() => setIsVideoVisible(false)} />
        )}
        <StatusBarManager />
        <SplashScreenHandler />

        <UserProvider>
          <CartProvider>
            {!isVideoVisible && children} {/* Render the rest of your app */}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}

// app/SplashScreenHandler.js
"use client"; // This makes the component a client component
import { useEffect } from "react";
import { SplashScreen } from "@capacitor/splash-screen";

const SplashScreenHandler = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Duration for splash
      await SplashScreen.hide();
    };

    hideSplashScreen();
  }, []);

  return null; // This component doesn't need to render anything
};

export default SplashScreenHandler;

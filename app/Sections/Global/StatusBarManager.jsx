// app/components/StatusBarManager.js
"use client"; // This makes it a client component

import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

const StatusBarManager = () => {
  useEffect(() => {
    const configureStatusBar = async () => {
      if (Capacitor.isNativePlatform()) {
        await StatusBar.setStyle({ style: Style.Dark }); // Set the style to Dark or Light
        await StatusBar.setBackgroundColor({ color: "#42328a" }); // Set your desired background color
        await StatusBar.show(); // Show the status bar
      }
    };

    configureStatusBar();
  }, []);

  return null; // This component does not need to render anything
};

export default StatusBarManager;

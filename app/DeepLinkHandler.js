"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";

const DeepLinkHandler = () => {
  useEffect(() => {
    App.addListener("appUrlOpen", (event) => {
      const slug = event.url.split(".app").pop();
      if (slug) {
        window.location.href = slug;
      }
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);

  return null;
};

export default DeepLinkHandler;

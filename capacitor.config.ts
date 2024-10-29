import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kindilearning.app",
  appName: "kindi Learning",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.72:3000",
    cleartext: true,
  },
  // server: {
  //   androidScheme: "https", // Enables JavaScript and allows `next/link` routing to work smoothly
  // },
};

export default config;

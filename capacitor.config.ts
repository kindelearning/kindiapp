import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kindilearning.app",
  appName: "Kindi Learning",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.72:3000",
    cleartext: true,
  },
};

export default config;

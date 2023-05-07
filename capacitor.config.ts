import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'platify',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: "192.168.74.1:3000",
    cleartext: true
  }
};

export default config;

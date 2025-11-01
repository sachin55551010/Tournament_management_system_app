import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0", // make it accessible over network
    allowedHosts: [
      "00e0fe9a31f9.ngrok-free.app", // 👈 your ngrok host
    ],
  },
});

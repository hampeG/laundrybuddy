import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Determine if we are in the development environment
const isDevelopment = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: isDevelopment
      ? {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, "/api"),
          },
        }
      : undefined,
  },
});

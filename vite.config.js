import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        kuku: resolve(__dirname, "manga/kuku/index.html"),
        gpsrun: resolve(__dirname, "manga/gpsrun/index.html"),
        fomus: resolve(__dirname, "manga/fomus/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});

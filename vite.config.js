import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 5177,
    open: true,
  },
});

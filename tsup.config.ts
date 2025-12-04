import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  loader: {
    ".jsx": "jsx",
    ".js": "jsx",
  },
});

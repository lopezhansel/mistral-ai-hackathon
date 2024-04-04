import { fileURLToPath } from "node:url";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const frontendDir = fileURLToPath(new URL("./", import.meta.url));
const frontendSrcDir = fileURLToPath(new URL("./src", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  root: frontendDir,
  plugins: [viteReact()],
  resolve: {
    alias: {
      "@": frontendSrcDir,
    },
  },
});

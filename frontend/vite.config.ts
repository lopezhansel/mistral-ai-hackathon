import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

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

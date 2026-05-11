import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { cloudflare } from "@cloudflare/vite-plugin"
import { extractRoutesPlugin } from "./vite-plugins/extract-routes";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    extractRoutesPlugin({
      sourceFile: "src/App.tsx",
      outputFile: "src/devtools/routes.generated.json",
    }),
    react(),
    cloudflare(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
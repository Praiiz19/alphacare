import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: [
      { find: "@/components/symptoms", replacement: path.resolve(__dirname, "./src/component/symtoms") },
      { find: "@/components", replacement: path.resolve(__dirname, "./src/component") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "./src/hook") },
      { find: "@/integrations", replacement: path.resolve(__dirname, "./src/integration") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
}));

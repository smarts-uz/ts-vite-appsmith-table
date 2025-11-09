import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        // plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"), // now main.tsx
      name: "MyAppsmithComponent",
      fileName: (format) => `app.${format}.js`,
      formats: ["umd","es"],
    },
  },
  server: {
    cors: true,
    host: true, // so it’s accessible via LAN / ngrok
  },
});

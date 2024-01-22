import { defineConfig } from "vite";

export default defineConfig({
  // ... outras configurações ...
  server: {
    port: 80,
    // Defina o host como '0.0.0.0' para torná-lo acessível externamente
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      "@pages": "/src/pages",
    },
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  // ... outras configurações ...
  resolve: {
    alias: {
      '@pages': '/src/pages'
    }
  }
});

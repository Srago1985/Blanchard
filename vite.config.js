import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/jquery') || id.includes('jquery-ui-dist')) {
            return 'jquery';
          }
          if (id.includes('node_modules/tippy.js') || id.includes('@popperjs/core')) {
            return 'tippy';
          }
        }
      }
    }
  }
});

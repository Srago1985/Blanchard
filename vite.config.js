import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.BASE_PATH || '/') : '/',
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/jquery')) {
            return 'jquery';
          }
          if (id.includes('node_modules/tippy.js') || id.includes('@popperjs/core')) {
            return 'tippy';
          }
        }
      }
    }
  }
}));

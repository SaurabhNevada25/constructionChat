import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/startRoute': {
        target: 'http://65.0.139.145:3000', // Backend API URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

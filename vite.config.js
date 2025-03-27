import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/startRoute': {
        target: 'https://construction-ai-node-backend.vercel.app:3000', // Backend API URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

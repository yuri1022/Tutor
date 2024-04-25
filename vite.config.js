import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tutor',
  plugins: [react()],
  build: {
    outDir: 'dist', 
    assetsDir: '', 
  },
  server: {
    host: '0.0.0.0',
    port: 3030,
    proxy: {
      '/api': {
        target: 'https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  }
});
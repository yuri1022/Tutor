import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tutor', // 指定基礎路徑
  plugins: [react()],
  build: {
    outDir: 'dist', // 指定打包後的目錄為 dist
    assetsDir: '', // 指定靜態資源直接放在 outDir 中
  },
  server: {
    host: '0.0.0.0',
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://54.250.240.16:3000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 可以自定義重寫規則，如果需要的話
      },
    },
  }
});
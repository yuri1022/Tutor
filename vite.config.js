import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
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
        target: 'https://ec2-54-250-240-16.ap-northeast-1.compute.amazonaws.com/', // 要代理的後端 API 地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 可以自定義重寫規則，如果需要的話
      },
    },
  }
});
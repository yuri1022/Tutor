import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

    esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import { jsx } from 'react'`,
  },server: { // 新增 server 的設定
    host: '0.0.0.0',
    port: 3030
  }
})
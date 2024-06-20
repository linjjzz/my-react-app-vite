import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 将 @ 指向 src 目录
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

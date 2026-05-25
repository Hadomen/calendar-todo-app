import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: backendUrl, changeOrigin: true },
    },
  },
  preview: {
    allowedHosts: true,
    proxy: {
      '/api': { target: backendUrl, changeOrigin: true },
    },
  },
})

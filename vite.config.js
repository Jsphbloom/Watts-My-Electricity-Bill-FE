import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 4173,
    // 👇 This is the key part
    allowedHosts: ['watts-my-electricity-bill-fe.onrender.com']
  }
})

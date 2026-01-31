import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    allowedHosts: [
      'devserver-main--portifolio-corebuild.netlify.app',
      'portifolio-corebuild.netlify.app'
    ]
  }
})
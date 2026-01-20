import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portifolio/',
  build: {
    outDir: 'docs',
    emptyOutDir: true, // Isso limpa a pasta docs a cada novo build
  }
})
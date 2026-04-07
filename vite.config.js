import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Importe o novo plugin

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(), // Adicione o tailwind aqui
  ],
  base: command === 'serve' ? '/' : '/portifolio/',
}))
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Alterado de react-swc para plugin-react

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portifolio/', // Mantemos a base corrigida para o GitHub Pages
})
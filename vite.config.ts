import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Para funcionar no GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})

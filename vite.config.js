import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages, uncomment base and set to '/<repo-name>/'
export default defineConfig({
  plugins: [react()],
  // base: '/ShopSphere/',
})

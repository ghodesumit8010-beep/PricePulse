import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Optimized for standard React + Tailwind v3/v4 processing
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Ensures clean HMR for your UI changes
    watch: {
      usePolling: true,
    },
  },
})
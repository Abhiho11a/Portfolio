import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import './theme-migrator.js'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  }
})
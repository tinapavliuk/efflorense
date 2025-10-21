import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths() /*, svgr() */],
  server: { port: 5173, open: true },
  preview: { port: 5174 },
})

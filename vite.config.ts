import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import istanbul from 'vite-plugin-istanbul'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    istanbul({
      include: ['src/**/*'],
      extension: ['.ts', '.tsx'],
      cypress: true,
      requireEnv: false,
    }),
  ],
  server: { port: 5173, open: true },
  preview: { port: 5174 },
})

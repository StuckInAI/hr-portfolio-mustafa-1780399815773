import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      // Use the new Rolldown-based optimizer instead of deprecated esbuild
      // (avoids vite:react-babel deprecation warnings on Vite 6+)
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})

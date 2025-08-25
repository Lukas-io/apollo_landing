import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import visualizer from 'vite-bundle-analyzer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' && visualizer()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-switch', 'lucide-react']
        }
      }
    },
    minify: 'terser',
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three']
  }
}))

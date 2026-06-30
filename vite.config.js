import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk warning limit slightly
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Router
          'router': ['react-router-dom'],
          // Animation library (heavy - isolate it)
          'framer-motion': ['framer-motion'],
          // Swiper
          'swiper': ['swiper'],
          // Icons (tree-shakeable but still large)
          'react-icons': ['react-icons'],
          // Email
          'emailjs': ['@emailjs/browser'],
          // UI utilities
          'ui-utils': ['sweetalert2'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
    // Generate source maps only for production debugging (disable to save space)
    sourcemap: false,
    // Compress assets
    assetsInlineLimit: 4096, // inline assets < 4kb as base64
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'swiper'],
  },
})

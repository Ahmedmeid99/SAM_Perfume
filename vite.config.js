import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification for smaller bundle size (better SEO)
    minify: 'esbuild',
    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-redux'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
    // Source maps for production debugging
    sourcemap: false,
    // Cache buster for better cache invalidation
    chunkFileNames: 'js/[name]-[hash].js',
    entryFileNames: 'js/[name]-[hash].js',
    assetFileNames: ({ name }) => {
      if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
        return 'images/[name]-[hash][extname]';
      } else if (/\.css$/.test(name ?? '')) {
        return 'css/[name]-[hash][extname]';
      }
      return 'assets/[name]-[hash][extname]';
    },
  },
  server: {
    // Better for local development
    strictPort: false,
  },
})

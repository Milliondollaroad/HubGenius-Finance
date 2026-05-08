import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react'

          if (
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run/')
          ) return 'vendor-router'

          if (id.includes('node_modules/')) return 'vendor-misc'
          if (id.includes('/context/'))    return 'contexts'
          if (id.includes('/components/')) return 'components'
          if (id.includes('/hooks/'))      return 'hooks'
        },

        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },

    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
  },

  server: {
    port: 3000,
    open: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})

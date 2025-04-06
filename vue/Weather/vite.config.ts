import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    fs: {
      strict: true
    },
    proxy: {
      '/yahoo-api/weather/V1/place': {
        target: 'https://map.yahooapis.jp',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/yahoo-api/, '')
      },
      '/yahoo-api/geocode/V1/geoCoder': {
        target: 'https://map.yahooapis.jp',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/yahoo-api/, '')
      },
      '/yahoo-api/search/local/V1/localSearch': {
        target: 'https://map.yahooapis.jp',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/yahoo-api/, '')
      }
    }
  },
  define: {
    'process.env.VITE_DISABLE_VIM': JSON.stringify(true)
  }
})

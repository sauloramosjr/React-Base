import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/common/components'),
      '@contexts': path.resolve(__dirname, 'src/common/contexts'),
      '@enums': path.resolve(__dirname, 'src/common/enums'),
      '@hooks': path.resolve(__dirname, 'src/common/hooks'),
      '@interfaces': path.resolve(__dirname, 'src/common/interfaces'),
      '@src/*': path.resolve(__dirname, 'src/*'),
      '@store': path.resolve(__dirname, 'src/common/store'),
      '@theme': path.resolve(__dirname, 'src/common/theme'),
      '@types': path.resolve(__dirname, 'src/common/types'),
      '@utils': path.resolve(__dirname, 'src/common/utils'),
    },
  },
  // ** caso for uma lib
  // build: {
  //   manifest: true,
  //   modulePreload: true,
  // },
  plugins: [react()],
})

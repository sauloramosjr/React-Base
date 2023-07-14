import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/common/utils'),
      '@components': path.resolve(__dirname, 'src/common/components'),
      '@hooks': path.resolve(__dirname, 'src/common/hooks'),
      '@enums': path.resolve(__dirname, 'src/common/enums'),
      '@store': path.resolve(__dirname, 'src/common/store'),
      '@theme': path.resolve(__dirname, 'src/common/theme'),
      '@types': path.resolve(__dirname, 'src/common/types'),
      '@src/*': path.resolve(__dirname, 'src/*'),
    },
  },
  // ** caso for uma lib
  // build: {
  //   manifest: true,
  //   modulePreload: true,
  // },
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Add this line
      'scenes': path.resolve(__dirname, 'src/scenes'),
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'miniComponents': path.resolve(__dirname, 'src/pages/miniComponents'),
          },
  },
});

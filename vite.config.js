import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Root-relative assets continue to resolve on nested clean URLs.
  base: '/',
  plugins: [react()],
});

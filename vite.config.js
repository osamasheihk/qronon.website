import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset URLs make the production build portable when it is served
  // from a subdirectory instead of the root of a domain.
  base: './',
  plugins: [react()],
});

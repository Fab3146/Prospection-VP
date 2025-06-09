import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Prospection-VP/', // ← très important pour GitHub Pages
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/', // Remplacez "Portfolio" par le nom exact de votre dépôt GitHub
  optimizeDeps: {
    exclude: ['lucide-react'], // Si vous avez des dépendances à exclure
  },
});

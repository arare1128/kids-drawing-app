import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['stamp.png', 'icon-192.svg', 'icon-512.svg'],
      manifest: {
        name: 'にこにこお絵かき',
        short_name: 'お絵かき',
        description: '指で楽しく絵を描ける子供向けお絵かきアプリ',
        icons: [
          {
            src: 'icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#fff8e7',
        background_color: '#fff8e7',
        orientation: 'portrait-primary',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  server: {
    open: true,
    port: 5173,
  },
});

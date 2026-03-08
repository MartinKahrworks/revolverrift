import { mergeConfig } from 'vite';

export default (config) => {
  return mergeConfig(config, {
    build: {
      // Generate unique filenames on every build
      rollupOptions: {
        output: {
          // Add timestamp to chunk names to prevent caching issues
          chunkFileNames: `[name]-[hash]-${Date.now()}.js`,
          entryFileNames: `[name]-[hash]-${Date.now()}.js`,
          assetFileNames: `[name]-[hash]-${Date.now()}.[ext]`,
        },
      },
    },
    // Disable service worker registration
    plugins: [
      {
        name: 'disable-service-worker',
        transformIndexHtml(html) {
          // Remove service worker registration from HTML
          return html.replace(
            /<script[^>]*service-worker[^>]*>.*?<\/script>/gi,
            ''
          );
        },
      },
    ],
  });
};

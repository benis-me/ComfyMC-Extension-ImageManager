import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInJs from 'vite-plugin-css-injected-by-js'
import { viteExternalsPlugin } from 'vite-plugin-externals'

const isProduction = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    cssInJs(),
    isProduction
      ? viteExternalsPlugin({
          vue: 'Vue',
          'tdesign-vue-next': 'TDesign',
          '@vueuse/core': 'VueUse',
        })
      : undefined,
  ],
  optimizeDeps: {
    exclude: isProduction ? ['vue', 'tdesign-vue-next'] : [],
  },
  build: {
    minify: true,
    lib: {
      entry: 'src/main.ts',
      name: '@comfymc-extension/image-manager',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'tdesign-vue-next'],
      output: {
        name: '@comfymc-extension/image-manager',
        format: 'esm',
        dir: '../js/',
        chunkFileNames: 'comfymc-extension-image-manager.chunk.js',
        entryFileNames: 'comfymc-extension-image-manager.entry.js',
        manualChunks: undefined,
      },
    },
    emptyOutDir: true,
  },
})

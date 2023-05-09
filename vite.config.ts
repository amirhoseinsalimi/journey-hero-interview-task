import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    mainFields: ['browser', 'module', 'main', 'jsnext:main', 'jsnext'],
  },
})

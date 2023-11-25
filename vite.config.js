import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path"


export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      "@fawmi/vue-google-maps",
      "fast-deep-equal",
    ],
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from "vite-plugin-windicss";
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    WindiCSS(), 
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    tsconfigPaths()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,      
        ws: true,
       }
    }
  }
})

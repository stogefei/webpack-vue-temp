import { join } from "path";
import * as path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  createVuePlugin(),
  vueJsx(),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), '../src/bpmn-icons')],
    // 指定symbolId格式
    symbolId: '[name]',
    customDomId: '__svg__icons__dom__'
  })
],
  resolve: {
    alias: {
      '@': join(__dirname, "../src/"),
    }
  }
})

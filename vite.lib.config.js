import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [vue(),
    {
      name: 'copy-files',
      closeBundle() {
        const files = ['LICENSE', 'package.json']
        files.forEach(file => {
          fs.copyFileSync(
            path.resolve(__dirname, file),
            path.resolve(__dirname, 'dist', file)
          )
        })
      }
    }],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'FengShuiCompass',
      fileName: (format) => `feng-shui-compass.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true,
    // 确保外部化处理那些你不想打包进库的依赖
    cssCodeSplit: true,
    minify: 'terser',
    emptyOutDir: true,
    // 生成类型声明文件
    declaration: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
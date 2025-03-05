import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 设置基础路径为相对路径，解决打包后资源路径问题
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为base64编码
    cssCodeSplit: true, // 启用CSS代码拆分
    sourcemap: false, // 生产环境不生成sourcemap
    minify: 'terser', // 使用terser进行混淆
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境去除console
        drop_debugger: true // 生产环境去除debugger
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 将第三方库拆分成单独的chunk
          vendor: ['vue', 'element-plus', '@element-plus/icons-vue'],
          // 将组件库拆分成单独的chunk
          components: ['vue3-ace-editor']
        }
      }
    }
  }
})

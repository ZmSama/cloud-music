/*
 * @Description:vue的配置文件都封装到这里来了
 * @Autor: ZmSama
 * @Date: 2021-05-10 10:11:28
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import viteSvgIcons from "vite-plugin-svg-icons"
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteSvgIcons({
    //   // 指定需要缓存的图标文件夹
    //   iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    //   // 指定symbolId格式
    //   symbolId: "icon-[dir]-[name]",
    // }),
  ],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/base.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
});

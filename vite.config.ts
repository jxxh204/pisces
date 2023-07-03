
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import removeConsole from "vite-plugin-remove-console";
import { createHtmlPlugin } from "vite-plugin-html";
import { splitVendorChunkPlugin } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    removeConsole(),
    createHtmlPlugin({
      minify: true,
    }),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: [
      // {
      //   find: "./runtimeConfig",
      //   replacement: "./runtimeConfig.browser",
      // },
      // {
      //   find: "@",
      //   replacement: fileURLToPath(new URL("./src", import.meta.url)),
      // },
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
    ],
  },
  // vite.config.js
  build: {
    outDir: "./src/server/client",
    // rollupOptions: {
    //   input: {
    //     main: 'src/main.ts',
    //     customFile: 'src/phaser/TiledProject/game2.json'
    //   }
    // }
  },
  
});

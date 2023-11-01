import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import babel from "vite-plugin-babel";
import commonjs from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ["@babel/plugin-transform-runtime"],
      },
    }),
  ],

  // base: '/iKU/', // 이 부분을 수정
});
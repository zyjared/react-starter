import path from 'node:path'
import { lingui } from '@lingui/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: ['babel-plugin-react-compiler', '@lingui/babel-plugin-lingui-macro'],
        },
      }),
      tailwindcss(),
      lingui({

      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

  }
})

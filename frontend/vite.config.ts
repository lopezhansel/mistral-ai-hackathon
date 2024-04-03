import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import viteReact from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const pathDir = dirname(fileURLToPath(import.meta.url))
const frontendDir = resolve(pathDir, './')
const frontendSrcDir = resolve(pathDir, 'src')


// https://vitejs.dev/config/
export default defineConfig({
  root: frontendDir,
  plugins: [viteReact()],
  resolve: {
    alias: {
      '@': frontendSrcDir,
    },
  },
})

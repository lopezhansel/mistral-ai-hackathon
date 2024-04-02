import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import viteReact from '@vitejs/plugin-react'

const path = fileURLToPath(import.meta.url)
const root = resolve(dirname(path), 'src/client')

const plugins = [
  viteReact()
]

export default defineConfig({
  root,
  plugins,
})
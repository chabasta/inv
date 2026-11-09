import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' + hash-роутинг (#/admin) = работает на GitHub Pages при любом имени репозитория
export default defineConfig({ base: './', plugins: [react()] })

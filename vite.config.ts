import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const inCI = process.env.GITHUB_ACTIONS === 'true'
  const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
  const base = inCI && repo ? `/${repo}/` : '/'
  return {
    base,
    plugins: [react()],
  }
})

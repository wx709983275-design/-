
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 这里的 base 必须和你的 GitHub 仓库名一致
  // 如果你的仓库链接是 https://github.com/xxx/my-app/，这里就写 '/my-app/'
  base: './', 
})

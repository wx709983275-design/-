
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  // 使用 (process as any) 是为了防止在该环境缺少 @types/node 时 TS 报错
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    // Vercel 部署建议使用根路径 '/'
    base: '/', 
    define: {
      // 关键配置：将系统环境变量注入到前端代码中，使 new GoogleGenAI({ apiKey: process.env.API_KEY }) 能正常工作
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    }
  }
})

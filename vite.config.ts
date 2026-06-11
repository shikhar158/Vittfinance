import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Custom Vite Plugin to simulate Vercel Serverless Functions locally
const apiServerPlugin = () => ({
  name: 'api-server',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url && req.url.startsWith('/api/')) {
        const url = new URL(req.url, `http://${req.headers.host}`)
        const pathname = url.pathname
        const filePath = `.${pathname}.ts`

        try {
          // Use Vite's SSR loading to transpile and run .ts handlers with HMR
          const module = await server.ssrLoadModule(filePath)
          const handler = module.default || module

          // Add Vercel response helper methods
          res.status = (code: number) => { res.statusCode = code; return res; }
          res.json = (data: any) => { 
            res.setHeader('Content-Type', 'application/json'); 
            res.end(JSON.stringify(data)); 
          }

          // Parse POST request body
          if (req.method === 'POST' && !req.body) {
            const buffers = []
            for await (const chunk of req) { buffers.push(chunk) }
            const data = Buffer.concat(buffers).toString()
            if (data) {
              try { req.body = JSON.parse(data) } catch (e) { req.body = {} }
            } else { req.body = {} }
          }

          // Execute exact Vercel handler signature 
          await handler(req, res)
        } catch (err: any) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ message: err.message || 'Internal Server Error' }))
        }
        return
      }
      next()
    })
  }
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      apiServerPlugin()
    ]
  }
})

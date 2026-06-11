require('ts-node/register')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: '.env.local' })

const app = express()
app.use(express.json())

// Wrapper transforms express signature to Vercel requirements
const wrapHandler = (handlerModule) => async (req, res) => {
  const handler = handlerModule.default || handlerModule
  const vercelReq = req
  const vercelRes = {
    status: (code) => {
      res.status(code)
      return vercelRes
    },
    json: (data) => res.json(data)
  }
  try {
    await handler(vercelReq, vercelRes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Load .ts API handlers using ts-node/register
const registerHandler = require('./api/auth/register')
const loginHandler = require('./api/auth/login')
const responseHandler = require('./api/response')
const portfolioHandler = require('./api/portfolio')

app.post('/api/auth/register', wrapHandler(registerHandler))
app.post('/api/auth/login', wrapHandler(loginHandler))
app.post('/api/response', wrapHandler(responseHandler))
app.get('/api/portfolio', wrapHandler(portfolioHandler))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`\n🚀 Local Backend Simulation running on http://localhost:${PORT}`)
})

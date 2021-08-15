const express = require('express')
const app = express()

// Import API routes
const router = require('./routes/api.js')
// Use API Routes
app.use(router)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

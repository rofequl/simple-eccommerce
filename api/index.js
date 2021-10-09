const express = require('express')
require('./db')
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.static('storage'))

// Import API routes
const router = require('./routes/api.js')
// Use API Routes
app.use(router)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

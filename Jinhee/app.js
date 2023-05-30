require('dotenv').config()
const routes = require('./routes')
const http = require('http')

const cors = require('cors')
const logger = require('morgan')

const express = require('express')
const { globalErrorHandler } = require('./middleware/error')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(routes)

app.use(globalErrorHandler)

const server = http.createServer(app)
const PORT = process.env.PORT

app.get('/ping', function (req, res, next) {
  res.json({ message: 'rewe' })
})

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
  } catch (err) {
    console.error(err)
  }
}

start()

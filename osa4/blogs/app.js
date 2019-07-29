const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')


const app = express()

mongoose.connect(config.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to database')
  })
  .catch(error => {
    console.log('Error while connecting to database', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)

module.exports = app
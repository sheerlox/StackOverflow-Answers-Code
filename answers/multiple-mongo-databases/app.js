const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const models = {
  databaseA: require('./models/databaseA'),
  databaseB: require('./models/databaseB')
}

const todos = require('./routes/todos')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  if (req.headers['x-use-database'] === 'databaseB') {
    req.models = models.databaseB
    console.log('Using Database B for this request.')
  } else {
    req.models = models.databaseA
    console.log('Using Database A for this request.')
  }
  next()
})

app.use('/api/todos', todos)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

/// ////////////////
// error handlers //
/// ////////////////

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app

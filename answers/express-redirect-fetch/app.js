const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.redirect('/signup')
})

app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'))
})

app.post('/api/signup', function (req, res) {
  const form = req.body.form
  res.json({
    success: true,
    email: form.email
  })
})

app.get('/signup/confirm-email', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'confirm.html'))
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

module.exports = app

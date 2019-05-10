const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  req.models.Todo.find(function (err, todos) {
    if (err) return next(err)
    res.json({
      success: true,
      todos
    })
  })
})

router.post('/', function (req, res, next) {
  req.models.Todo.create(req.body, function (err, todo) {
    if (err) return next(err)
    res.json({
      success: true,
      todo
    })
  })
})

router.get('/:id', function (req, res, next) {
  req.models.Todo.findById(req.params.id, function (err, todo) {
    if (err) return next(err)
    res.json({
      success: true,
      todo
    })
  })
})

module.exports = router

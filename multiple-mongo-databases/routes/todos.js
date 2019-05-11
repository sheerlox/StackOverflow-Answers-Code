const express = require('express')
const router = express.Router()

/**
 * @api {get} /api/todos Request all Todos
 * @apiName GetTodos
 * @apiGroup Todos
 *
 * @apiSuccess {Boolean} success Whether or not the request succeeded.
 * @apiSuccess {Todo[]} todos Array of the existing todos.
 */
router.get('/', function (req, res, next) {
  req.models.Todo.find(function (err, todos) {
    if (err) return next(err)
    res.json({
      success: true,
      todos
    })
  })
})

/**
 * @api {post} /api/todos Create a new Todo
 * @apiName CreateTodo
 * @apiGroup Todos
 *
 * @apiParam {String} name Name of the todo.
 * @apiParam {String} note Content of the todo.
 *
 * @apiSuccess {Boolean} success Whether or not the request succeeded.
 * @apiSuccess {Todo} todo Created Todo.
 */
router.post('/', function (req, res, next) {
  req.models.Todo.create(req.body, function (err, todo) {
    if (err) return next(err)
    res.json({
      success: true,
      todo
    })
  })
})

/**
 * @api {get} /api/todos/:id Get a Todo by ID.
 * @apiName GetTodo
 * @apiGroup Todos
 *
 * @apiParam {Number} id Todo unique ID.
 *
 * @apiSuccess {Boolean} success Whether or not the request succeeded.
 * @apiSuccess {Todo} todo Requested Todo.
 */
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

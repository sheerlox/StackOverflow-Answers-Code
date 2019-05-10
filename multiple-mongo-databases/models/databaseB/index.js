const mongoose = require('./mongoose')
const TodoSchema = require('../schemas/Todo')

module.exports = {
  Todo: mongoose.model('Todo', TodoSchema)
}

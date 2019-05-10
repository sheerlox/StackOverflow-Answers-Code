const mongoose = require('./mongoose')

const TodoSchema = new mongoose.Schema({
  name: String,
  note: String,
  completed: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Todo', TodoSchema)

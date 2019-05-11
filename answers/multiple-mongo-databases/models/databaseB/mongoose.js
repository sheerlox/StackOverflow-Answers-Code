const Mongoose = require('mongoose').Mongoose

const mongoose = new Mongoose()
mongoose.connect('mongodb://localhost:27017/databaseB', { useNewUrlParser: true })

module.exports = mongoose

const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  microsoftId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)

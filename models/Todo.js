const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({ // setting up document for each todo completed and defining the type of each property 
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

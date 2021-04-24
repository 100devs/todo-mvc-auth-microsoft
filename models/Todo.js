const mongoose = require("mongoose"); // Request mongoose to communicate with the DB

// Schema is like a blueprint of what the todo should have.
const TodoSchema = new mongoose.Schema({
  todo: {
    type: String, // This is the text description entered by the user for each task
    required: true,
  },
  completed: {
    type: Boolean, // Boolean just true or false //
    required: true,
  },
  microsoftId: {
    type: String, // String type is the userID //
    required: true,
  },
});

// Here we are creating a model based on the todo schema and the name is 'Todo'
module.exports = mongoose.model("Todo", TodoSchema);

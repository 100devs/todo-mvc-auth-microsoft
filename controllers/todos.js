const Todo = require("../models/Todo");

module.exports = {
  // When user makes a request retrives the todos from the DB matching his microsoftID
  getTodos: async (req, res) => {
    console.log(req.user);
    try {
      //Do we want to grab all the todos? No just the ones that match the MicrosoftId
      const todoItems = await Todo.find({ microsoftId: req.user.microsoftId });
      //How can we grab our logged in users left to dos?
      const itemsLeft = await Todo.countDocuments({
        microsoftId: req.user.microsoftId,
        completed: false,
      });
      // Render is serving HTML as a response we pass the data from the DB
      res.render("todos.ejs", {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // Create a new todo
  createTodo: async (req, res) => {
    try {
      // Express is getting a json object from the frontend and serving it to the server.
      // Set the completed value as false (default)
      // Adds the microsoftID
      await Todo.create({
        todo: req.body.todoItem,
        completed: false,
        microsoftId: req.user.microsoftId,
      });
      // Just console log a success message
      console.log("Todo has been added!");
      // Reloads the page after the todo is created
      res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },

  //
  markComplete: async (req, res) => {
    try {
      // Uses the unique id of the task when the user wants to mark it as completed
      // Changes the completed value to true
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      // Just console log message to confirm the operation server side
      console.log("Marked Complete");
      // Respond to front end.
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  // Almost the same thing as markComplete but the oposite operation
  // Mark the task completed as false
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  // Gets the id, finds the match in the DB and deletes it
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};

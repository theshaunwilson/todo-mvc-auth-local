const Todo = require('../models/Todo'); // Get our Todo model (the rules for todos)

module.exports = {
  // Get and show all todos
  getTodos: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Todo.find({ userId: req.user.id }); // Find all todos for this user
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      }); // Count unfinished todos
      res.render('todos.ejs', {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      }); // Show todos page
    } catch (err) {
      console.log(err);
    }
  },

  // Create a new todo
  createTodo: async (req, res) => {
    try {
      await Todo.create({
        // Make new todo in database
        todo: req.body.todoItem, // The todo text
        completed: false, // Not done yet
        userId: req.user.id, // Who made it
      });
      console.log('Todo has been added!');
      res.redirect('/todos'); // Go back to todos page
    } catch (err) {
      console.log(err);
    }
  },

  // Mark a todo as done
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile }, // Find this specific todo
        { completed: true } // Mark it done
      );
      console.log('Marked Complete');
      res.json('Marked Complete');
    } catch (err) {
      console.log(err);
    }
  },

  // Mark a todo as not done
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile }, // Find this specific todo
        { completed: false } // Mark it not done
      );
      console.log('Marked Incomplete');
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },

  // Delete a todo
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile }); // Find and remove this todo
      console.log('Deleted Todo');
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};

// Get our tools
const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const { ensureAuth } = require('../middleware/auth');

// Different todo actions and where they go:
router.get('/', ensureAuth, todosController.getTodos); // Show todos list
// ensureAuth checks if user is logged in first

router.post('/createTodo', todosController.createTodo); // Handle making new todo

router.put('/markComplete', todosController.markComplete); // Handle marking todo as done

router.put('/markIncomplete', todosController.markIncomplete); // Handle marking todo as not done

router.delete('/deleteTodo', todosController.deleteTodo); // Handle deleting a todo

module.exports = router;

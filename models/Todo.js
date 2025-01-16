const mongoose = require('mongoose'); // Tool for working with MongoDB

// Create a template for what every todo should look like
const TodoSchema = new mongoose.Schema({
  todo: {
    // The actual todo text
    type: String, // Must be text
    required: true, // Must be included
  },
  completed: {
    // Todo status
    type: Boolean, // Must be true/false
    required: true, // Must be included
  },
  userId: {
    // Which user owns this todo
    type: String, // User's ID as text
    required: true, // Must be included
  },
});

// Export this model so other files can use it
module.exports = mongoose.model('Todo', TodoSchema);

/*
server.js - MVC Connection Point
-----------------------------------
This file connects all parts of the MVC (Model-View-Controller) pattern:

MODEL (Database & Data):
- Connects to MongoDB (database setup)
- Sets up Mongoose (for working with data models)

VIEW (What Users See):
- Sets up EJS (for showing web pages)
- Handles static files (like images and CSS)

CONTROLLER (Brain/Logic):
- Sets up routes (handles user requests)
- Manages user sessions (remembers users)
- Handles authentication (login system)

Think of this file as the glue that holds all MVC pieces together!
*/

// Get the tools we need for building our website
const express = require('express'); // The main framework that helps us build the website
const app = express(); // Create our website application
const mongoose = require('mongoose'); // Tool to work with MongoDB database
const passport = require('passport'); // Handles user login
const session = require('express-session'); // Remembers user information as they browse
const MongoStore = require('connect-mongo')(session); // Stores user session info in MongoDB
const flash = require('express-flash'); // Shows quick messages to users
const logger = require('morgan'); // Logs what's happening on our server
const connectDB = require('./config/database'); // Our database connection setup
const mainRoutes = require('./routes/main'); // Main website pages routes
const todoRoutes = require('./routes/todos'); // Todo-specific routes

// Load our secret environment variables
require('dotenv').config({ path: './config/.env' });

// Set up user login system
require('./config/passport')(passport);

// Connect to our database
connectDB();

// Tell our app how to handle different things
app.set('view engine', 'ejs'); // Use EJS to show web pages
app.use(express.static('public')); // Serve files from 'public' folder
app.use(express.urlencoded({ extended: true })); // Handle form submissions
app.use(express.json()); // Handle JSON data
app.use(logger('dev')); // Log server activity

// Set up how we'll remember user sessions
app.use(
  session({
    secret: 'keyboard cat', // Secret key for session security
    resave: false, // Don't save session if nothing changed
    saveUninitialized: false, // Don't create session until something stored
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Store sessions in MongoDB
  })
);

// Set up login system middleware
app.use(passport.initialize()); // Start up passport
app.use(passport.session()); // Let passport work with sessions

app.use(flash()); // Enable flash messages

// Set up our website routes
app.use('/', mainRoutes); // Handle main pages
app.use('/todos', todoRoutes); // Handle todo-related pages

// Start our server
app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!');
});

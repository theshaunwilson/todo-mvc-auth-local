# Todo Application Overview

## What This App Does

This is a todo list application where users can:

1. Create personal accounts
2. Add, complete, and delete todos
3. Track their progress
4. Keep their todos private and secure

## How It's Built (MVC Pattern)

- **Model**: Handles data and database rules
- **View**: Shows pages to users
- **Controller**: Contains the application logic

## Basic User Flow

1. User creates account or logs in
2. Views their personal todo list
3. Can create, complete, or delete todos
4. Everything saves to their account

---

# Detailed MVC Structure Breakdown

## Models (Data Structure)

- `models/User.js`

  - Defines user data structure (username, email, password)
  - Handles password hashing using bcrypt
  - Has methods to compare passwords for login

- `models/Todo.js`
  - Defines todo item structure (text, completed status, user ID)
  - Links todos to specific users

## Views (What Users See)

- `views/index.ejs`

  - Home page with login/signup links
  - First page users see

- `views/login.ejs`

  - Login form
  - Shows error messages
  - Handles email/password input

- `views/signup.ejs`

  - Signup form
  - Validates user input
  - Creates new accounts

- `views/todos.ejs`
  - Main todo list interface
  - Shows todos and completion status
  - Has form for new todos
  - Links to frontend JavaScript

## Controllers (Business Logic)

- `controllers/auth.js`

  - Handles login/signup logic
  - Validates user input
  - Manages user sessions

- `controllers/home.js`

  - Simple controller for home page
  - Renders index view

- `controllers/todos.js`
  - Creates new todos
  - Marks todos complete/incomplete
  - Deletes todos
  - Gets todos for display

## Supporting Files

### Routes (URL Handling)

- `routes/main.js`

  - Handles login/signup/home URLs
  - Connects URLs to auth controllers

- `routes/todos.js`
  - Handles todo-related URLs
  - Connects URLs to todo controllers

### Configuration

- `config/database.js`

  - Sets up MongoDB connection
  - Handles database errors

- `config/passport.js`
  - Sets up authentication
  - Manages how users log in
  - Handles sessions

### Middleware

- `middleware/auth.js`
  - Protects routes
  - Checks if users are logged in

### Public Files

- `public/css/style.css`

  - Basic styling
  - Todo completion status styles

- `public/js/main.js`
  - Frontend interactivity
  - Handles todo actions
  - Makes API calls to backend

### Core Setup

- `server.js`

  - Main application file
  - Sets up Express
  - Connects all parts together

- `package.json`

  - Lists all dependencies
  - Defines start scripts

- `.env`
  - Environment variables
  - Database connection string
  - Port settings

## Flow of Data

1. User visits URL → Routes direct traffic
2. Middleware checks authentication
3. Controllers process the request
4. Models handle data operations
5. Views show the result
6. Public files add styling and interactivity

## Security Features

- Password hashing
- Session management
- Protected routes
- Input validation

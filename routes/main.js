/*
main.js - Main Routes File
-------------------------
This file is like a map for our website's main pages.
It tells the app what to do when users visit different URLs.
Part of the CONTROLLER in MVC - it directs traffic to the right place!

Routes handled here:
- Home page ('/')
- Login page ('/login')
- Signup page ('/signup')
- Logout ('/logout')

It is needed for organization rather than putting all routes in server.js / traffic direction / security flow
*/

// Get tools we need
const express = require('express'); // Framework for handling web requests
const router = express.Router(); // Create a router to handle different URLs

// Get our controllers (they contain the actual logic)
const authController = require('../controllers/auth'); // Handles login/signup/logout
const homeController = require('../controllers/home'); // Handles home page
const { ensureAuth, ensureGuest } = require('../middleware/auth'); // Checks if users are logged in

// Define what happens at each URL:
router.get('/', homeController.getIndex); // When someone visits home page
router.get('/login', authController.getLogin); // Show login page
router.post('/login', authController.postLogin); // Handle login form submission
router.get('/logout', authController.logout); // Handle logout
router.get('/signup', authController.getSignup); // Show signup page
router.post('/signup', authController.postSignup); // Handle signup form submission

// Export this router so server.js can use it
module.exports = router;

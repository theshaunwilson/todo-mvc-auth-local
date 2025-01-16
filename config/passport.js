const LocalStrategy = require('passport-local').Strategy; // Tool for local login
const mongoose = require('mongoose'); // Database tool
const User = require('../models/User'); // Our User model

module.exports = function (passport) {
  // Set up how login should work
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Use email for login
      },
      (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (err) {
            return done(err);
          } // If error, stop
          if (!user) {
            // If no user found
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            // If no password set
            return done(null, false, {
              msg: 'Your account was registered using a sign-in provider...',
            });
          }
          // Check if password matches
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              // If password correct
              return done(null, user); // Login success
            }
            return done(null, false, { msg: 'Invalid email or password.' });
          });
        });
      }
    )
  );

  // How to save user info in session
  passport.serializeUser((user, done) => {
    done(null, user.id); // Save just the user ID
  });

  // How to get user info from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user)); // Find user by ID
  });
};

const passport = require('passport'); // Tool for handling logins
const validator = require('validator'); // Tool for checking if emails/passwords are valid
const User = require('../models/User'); // Our user model (rules for user data)

// SHOW LOGIN PAGE
exports.getLogin = (req, res) => {
  if (req.user) {
    // If already logged in
    return res.redirect('/todos'); // Go to todos page
  }
  res.render('login', {
    // Otherwise show login page
    title: 'Login',
  });
};

// HANDLE LOGIN FORM SUBMISSION
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  // Check if email and password are valid
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Password cannot be blank.' });

  // If there are errors, show them and go back to login
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/login');
  }

  // Clean up email format
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Try to log in with passport
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // If login failed
      req.flash('errors', info); // Show error
      return res.redirect('/login'); // Back to login page
    }
    req.logIn(user, (err) => {
      // If login worked
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/todos'); // Go to todos
    });
  })(req, res, next);
};

// HANDLE LOGOUT
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.');
  });
  req.session.destroy((err) => {
    // Remove session data
    if (err)
      console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.redirect('/'); // Go to home page
  });
};

// SHOW SIGNUP PAGE
exports.getSignup = (req, res) => {
  if (req.user) {
    // If already logged in
    return res.redirect('/todos'); // Go to todos page
  }
  res.render('signup', {
    // Show signup page
    title: 'Create Account',
  });
};

// HANDLE SIGNUP FORM SUBMISSION
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  // Check for valid input
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Password must be at least 8 characters long',
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: 'Passwords do not match' });

  // If errors, show them and go back to signup
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('../signup');
  }

  // Clean up email format
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Create new user object
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  // Check if user already exists
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash('errors', {
          msg: 'Account with that email address or username already exists.',
        });
        return res.redirect('../signup');
      }
      // Save new user and log them in
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/todos');
        });
      });
    }
  );
};

module.exports = {
  ensureAuth: function (req, res, next) {
    // Function to check if logged in
    if (req.isAuthenticated()) {
      // If user is logged in
      return next(); // Continue to next step
    } else {
      // If not logged in
      res.redirect('/'); // Send to home page
    }
  },
};

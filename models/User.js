const bcrypt = require('bcrypt'); // Tool for password security
const mongoose = require('mongoose'); // Tool for working with MongoDB

// Create a template for what every user should look like
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true }, // Username must be text and unique
  email: { type: String, unique: true }, // Email must be text and unique
  password: String, // Password as text
});

// BEFORE saving a user, do this:
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  } // If password hasn't changed, skip

  bcrypt.genSalt(10, (err, salt) => {
    // Create a salt for security
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      // Scramble the password
      if (err) {
        return next(err);
      }
      user.password = hash; // Save scrambled password
      next();
    });
  });
});

// Add a way to check if password is correct
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    // Compare passwords
    cb(err, isMatch);
  });
};

// Export this model so other files can use it
module.exports = mongoose.model('User', UserSchema);

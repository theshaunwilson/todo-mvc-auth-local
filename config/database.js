const mongoose = require('mongoose'); // Tool for MongoDB

// Function to connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING); // Remove deprecated options

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Show success message
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`); // Improved error logging
    process.exit(1); // Stop app if can't connect
  }
};

module.exports = connectDB; // Share this function

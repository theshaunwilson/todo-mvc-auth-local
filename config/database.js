const mongoose = require('mongoose'); // Tool for MongoDB

// Function to connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true, // Use new connection parser
      useUnifiedTopology: true, // Use new connection engine
      useFindAndModify: false, // Don't use old update methods
      useCreateIndex: true, // Use new index engine
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Show success message
  } catch (err) {
    console.error(err); // If error, show it
    process.exit(1); // Stop app if can't connect
  }
};

module.exports = connectDB; // Share this function

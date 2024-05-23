// config/db.js

// Import the necessary modules
const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log a message if the connection is successful
    console.log('MongoDB connected');
  } catch (err) {
    // Log the error message if the connection fails
    console.error(err.message);

    // Exit the process with failure
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;

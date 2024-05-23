// index.js

// Import the necessary modules
const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const dotenv = require('dotenv'); // Import dotenv for environment variables management
const connectDB = require('./config/db'); // Import the database connection function
const authRoutes = require('./routes/auth.routes'); // Import authentication routes

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS for all routes
app.use(cors());

// Middleware to handle routes related to authentication under the '/api/auth' path
app.use('/api/auth', authRoutes);

// Define the port on which the server will listen, default to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

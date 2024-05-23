// routes/auth.routes.js

// Import the necessary modules
const express = require('express'); // Import the Express framework
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/auth.controller'); // Import authentication controller functions
const { protect } = require('../middleware/authMiddleware'); // Import middleware for route protection

// Create a new router instance
const router = express.Router();

// Define the route for user registration
// POST request to /signup will invoke registerUser function
router.post('/signup', registerUser);

// Define the route for user authentication
// POST request to /login will invoke authUser function
router.post('/login', authUser);

// Define routes for user profile actions (get, update, delete)
// These routes are protected by the 'protect' middleware
router
  .route('/profile')
  .get(protect, getUserProfile) // GET request to /profile will invoke getUserProfile function
  .put(protect, updateUserProfile) // PUT request to /profile will invoke updateUserProfile function
  .delete(protect, deleteUserProfile); // DELETE request to /profile will invoke deleteUserProfile function

// Export the router instance to be used in other parts of the application
module.exports = router;

// middleware/authMiddleware.js

// Import the necessary modules
const jwt = require('jsonwebtoken'); // Import JSON Web Token for creating and verifying tokens
const User = require('../models/user.model.js'); // Import the User model

// Middleware function to protect routes and ensure user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token and exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      // Call next middleware or route handler
      next();
    } catch (error) {
      // If token verification fails, respond with a 401 status
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found, respond with a 401 status
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

// Export the protect middleware function
module.exports = { protect };

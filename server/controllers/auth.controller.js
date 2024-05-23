// controllers/auth.controller.js

// Import the necessary modules
const jwt = require('jsonwebtoken'); // Import JSON Web Token for creating and verifying tokens
const User = require('../models/user.model.js'); // Import the User model

// Function to generate a JWT token for a user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// Controller function to register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Extract name, email, and password from request body

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' }); // Return error if user exists
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // Respond with user details and token if user creation is successful
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' }); // Return error if user creation fails
  }
};

// Controller function to authenticate a user and generate a token
const authUser = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    // Respond with user details and token if authentication is successful
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' }); // Return error if authentication fails
  }
};

// Controller function to get the authenticated user's profile
const getUserProfile = async (req, res) => {
  // Find the user by ID from the request object
  const user = await User.findById(req.user._id);

  if (user) {
    // Respond with user details if user is found
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' }); // Return error if user is not found
  }
};

// Controller function to update the authenticated user's profile
const updateUserProfile = async (req, res) => {
  // Find the user by ID from the request object
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user details
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user details
    const updatedUser = await user.save();

    // Respond with updated user details and token
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' }); // Return error if user is not found
  }
};

// Controller function to delete the authenticated user's profile
const deleteUserProfile = async (req, res) => {
  try {
    // Delete the user by ID from the request object
    await User.deleteOne({ _id: req.user._id });
    res.json({ message: 'User removed' }); // Respond with success message if user is deleted
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' }); // Return error if deletion fails
  }
};

// Export the controller functions for use in routes
module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};

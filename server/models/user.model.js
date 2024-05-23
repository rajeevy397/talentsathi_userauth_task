// models/User.js

// Import the necessary modules
const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  name: {
    type: String, // Name of the user, a string
    required: true, // Name is required
  },
  email: {
    type: String, // Email of the user, a string
    required: true, // Email is required
    unique: true, // Email must be unique
  },
  password: {
    type: String, // Password of the user, a string
    required: true, // Password is required
  },
});

// Middleware to hash the password before saving the user document
UserSchema.pre('save', async function (next) {
  // Check if the password is modified
  if (!this.isModified('password')) {
    return next(); // If not modified, move to the next middleware
  }
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  // Move to the next middleware
  next();
});

// Method to compare entered password with the hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare entered password with the stored hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the User model to be used in other parts of the application
module.exports = User;

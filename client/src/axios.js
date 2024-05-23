// utils/axiosInstance.js

// Import the Axios library for making HTTP requests
import axios from 'axios';

// Create an Axios instance with custom configuration
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Set the base URL for all requests made with this instance
  // Adjust the baseURL according to your backend server's address
});

// Export the Axios instance to be used in other parts of the application
export default instance;

// DefineStore is used to define a Pinia store
import { defineStore } from 'pinia'; // Import defineStore function from Pinia library
import axios from '@/axios'; // Import axios instance configured with baseURL

// Define and export useAuthStore function to create a Pinia store for authentication
export const useAuthStore = defineStore('auth', {
  // Define the initial state of the store
  state: () => ({
    user: null, // Initialize user as null
    token: localStorage.getItem('token') || '' // Initialize token with token stored in localStorage or an empty string if no token exists
  }),

  // Define actions to perform operations on the store
  actions: {
    // Action to sign up a new user
    async signUp(userData) {
      // Send a POST request to the /signup endpoint with user data
      const response = await axios.post('/signup', userData);
      // Update user and token in the store with response data
      this.user = response.data.user;
      this.token = response.data.token;
      // Store token in localStorage
      localStorage.setItem('token', this.token);
    },

    // Action to log in an existing user
    async login(userData) {
      // Send a POST request to the /login endpoint with user data
      const response = await axios.post('/login', userData);
      // Update user and token in the store with response data
      this.user = response.data.user;
      this.token = response.data.token;
      // Store token in localStorage
      localStorage.setItem('token', this.token);
    },

    // Action to fetch user profile
    async fetchUser() {
      // Check if token exists
      if (this.token) {
        try {
          console.log('Fetching user...');
          // Send a GET request to the /profile endpoint with authorization token
          const response = await axios.get('/profile', {
            headers: { Authorization: `Bearer ${this.token}` }
          });
          console.log('User fetched:', response.data);
          // Update user in the store with response data
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Call logout action if fetching user profile fails
          this.logout();
        }
      }
    },

    // Action to edit user profile
    async editProfile(updatedData) {
      // Send a PUT request to the /profile endpoint with updated data and authorization token
      const response = await axios.put('/profile', updatedData, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      // Update user in the store with response data
      this.user = response.data.user;
    },

    // Action to delete user account
    async deleteAccount() {
      // Send a DELETE request to the /profile endpoint with authorization token
      await axios.delete('/profile', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      // Clear user and token in the store
      this.user = null;
      this.token = '';
      // Remove token from localStorage
      localStorage.removeItem('token');
    },

    // Action to logout user
    logout() {
      // Clear user and token in the store
      this.user = null;
      this.token = '';
      // Remove token from localStorage
      localStorage.removeItem('token');
    }
  }
});

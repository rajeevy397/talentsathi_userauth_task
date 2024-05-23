<!-- LoginView.vue -->

<template>
  <!-- Main container for the login page content with a top margin -->
  <div class="container mt-5">
    <!-- Heading for the login form -->
    <h2 class="text-center">Login</h2>
    <!-- Form for user login with event listener for form submission -->
    <form @submit.prevent="loginUser" class="w-50 mx-auto">
      <!-- Input field for email -->
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required>
      </div>
      <!-- Input field for password -->
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
      </div>
      <!-- Submit button for login -->
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script>
// Import necessary modules and components
import { useAuthStore } from '../store'; // Import the Auth store
import { useToast } from 'vue-toastification'; // Import the useToast function

// Export the component definition
export default {
  // Name of the component
  name: 'LoginView',
  // Data function to initialize component data
  data() {
    return {
      email: '', // Initialize email data property
      password: '' // Initialize password data property
    };
  },
  // Setup function for composition API
  setup() {
    const store = useAuthStore(); // Get access to the Auth store
    const toast = useToast(); // Initialize useToast

    return { store, toast }; // Return the store and toast for use in the component
  },
  // Methods object for defining component methods
  methods: {
    // Method for handling user login
    async loginUser() {
      try {
        // Attempt to login using provided email and password
        await this.store.login({ email: this.email, password: this.password });
        // Redirect to profile page after successful login
        this.$router.push('/profile');
        // Show success toast notification
        this.toast.success('Login successful!');
      } catch (error) {
        // Log and display error message if login fails
        console.error(error.response.data.message);
        this.toast.error('Login failed. Please check your credentials.');
      }
    }
  }
} 
</script>

<style scoped>
/* Add additional styling if needed */
</style>

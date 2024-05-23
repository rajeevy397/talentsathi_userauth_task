<!-- SignUpView.vue -->

<template>
  <!-- Main container for the sign-up form with a top margin -->
  <div class="container mt-5">
    <!-- Heading for the sign-up form -->
    <h2 class="text-center">Sign Up</h2>
    <!-- Form for signing up a new user -->
    <form @submit.prevent="signUpUser" class="w-50 mx-auto">
      <!-- Input field for user's name -->
      <div class="mb-3">
        <input v-model="name" type="text" class="form-control" placeholder="Name" required>
      </div>
      <!-- Input field for user's email -->
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required>
        <!-- Error message for invalid email format -->
        <div v-if="!isValidEmail(email)" class="alert alert-danger mt-2" role="alert">
          Please enter a valid email address.
        </div>
      </div>
      <!-- Input field for user's password -->
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
        <!-- Error message for weak password -->
        <div v-if="!isValidPassword(password)" class="alert alert-warning mt-2" role="alert">
          Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
        </div>
      </div>
      <!-- Submit button for signing up -->
      <button type="submit" class="btn btn-secondary w-100">Sign Up</button>
    </form>
    <!-- Loading indicator while signing up -->
    <div v-if="isLoading">
      <p class="text-center">Signing up...</p>
    </div>
    <!-- Error message display -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script>
// Import necessary modules and components
import { useAuthStore } from '../store'; // Import the Auth store
import { ref } from 'vue'; // Import Vue ref function
import { useRouter } from 'vue-router'; // Import Vue Router for navigation
import { useToast } from 'vue-toastification'; // Import Toastification for displaying toast messages

// Export the component definition
export default {
  // Name of the component
  name: 'SignUpView',
  // Setup function for composition API
  setup() {
    // Access to Auth store, router, and toast notification
    const store = useAuthStore();
    const router = useRouter();
    const toast = useToast();

    // Reactive variables for form fields, loading state, and error message
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const error = ref('');

    // Method to validate email format
    const isValidEmail = (email) => {
      // Basic email validation using regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Method to validate password strength
    const isValidPassword = (password) => {
      // Strong password validation using regex
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    // Method to sign up a new user
    const signUpUser = async () => {
      try {
        // Set loading state to true
        isLoading.value = true;
        // Validate email format
        if (!isValidEmail(email.value)) {
          throw new Error('Please enter a valid email address.');
        }
        // Validate password strength
        if (!isValidPassword(password.value)) {
          throw new Error('Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        }
        // Call API to sign up user
        await store.signUp({ name: name.value, email: email.value, password: password.value });
        // Redirect to profile page after successful signup
        router.push('/profile');
        // Display success toast message
        toast.success('Registration successful!');
      } catch (error) {
        // Log and display error message if signup fails
        console.error('Error signing up:', error.message);
        error.value = error.message;
        // Reset loading state
        isLoading.value = false;
      }
    };

    // Return variables and methods for use in the template
    return {
      name,
      email,
      password,
      isLoading,
      error,
      signUpUser,
      isValidEmail,
      isValidPassword
    };
  }
}
</script>

<style scoped>
/* Scoped styles for the component */
/* Add additional styling if needed */
</style>

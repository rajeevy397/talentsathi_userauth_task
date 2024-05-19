<template>
  <div class="container mt-5">
    <h2 class="text-center">Sign Up</h2>
    <form @submit.prevent="signUpUser" class="w-50 mx-auto">
      <div class="mb-3">
        <input v-model="name" type="text" class="form-control" placeholder="Name" required>
      </div>
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required>
        <div v-if="!isValidEmail(email)" class="alert alert-danger mt-2" role="alert">
          Please enter a valid email address.
        </div>
      </div>
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
        <div v-if="!isValidPassword(password)" class="alert alert-warning mt-2" role="alert">
          Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
        </div>
      </div>
      <button type="submit" class="btn btn-secondary w-100">Sign Up</button>
    </form>
    <div v-if="isLoading">
      <p class="text-center">Signing up...</p>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script>

import { useAuthStore } from '../store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useToast } from 'vue-toastification';

export default {
  name: 'SignUpView',
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const toast = useToast();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const error = ref('');

    const isValidEmail = (email) => {
      // Basic email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password) => {
      // Strong password validation
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const signUpUser = async () => {
      try {
        isLoading.value = true;
        if (!isValidEmail(email.value)) {
          throw new Error('Please enter a valid email address.');
        }
        if (!isValidPassword(password.value)) {
          throw new Error('Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        }
        await store.signUp({ name: name.value, email: email.value, password: password.value });
        router.push('/profile'); // Redirect to profile page after signup
        toast.success('Registration successful!');
      } catch (error) {
        console.error('Error signing up:', error.message);
        error.value = error.message;
        isLoading.value = false;
      }
    };

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
/* Add additional styling if needed */
</style>

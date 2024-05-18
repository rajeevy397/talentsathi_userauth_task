<template>
    <div class="container mt-5">
      <h2 class="text-center">Sign Up</h2>
      <form @submit.prevent="signUpUser" class="w-50 mx-auto">
        <div class="mb-3">
          <input v-model="name" type="text" class="form-control" placeholder="Name" required>
        </div>
        <div class="mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required>
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-secondary w-100">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../store';
  
  export default {
    name: 'SignUpView',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    setup() {
      const store = useAuthStore();
      return { store };
    },
    methods: {
      signUpUser() {
        this.store.signUp({ name: this.name, email: this.email, password: this.password });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add additional styling if needed */
  </style>
  
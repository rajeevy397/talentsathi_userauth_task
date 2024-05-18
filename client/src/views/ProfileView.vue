<template>
    <div class="container mt-5">
      <h2 class="text-center">User Profile</h2>
      <div v-if="user" class="card w-50 mx-auto">
        <div class="card-body">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <button @click="editProfile" class="btn btn-warning mx-2">Edit</button>
          <button @click="deleteAccount" class="btn btn-danger mx-2">Delete Account</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../store';
  
  export default {
    name: 'ProfileView',
    setup() {
      const store = useAuthStore();
      return {
        user: store.user,
        editProfile: store.editProfile,
        deleteAccount: store.deleteAccount
      };
    }
  }
  </script>
  
  <style scoped>
  /* Add additional styling if needed */
  </style>
  
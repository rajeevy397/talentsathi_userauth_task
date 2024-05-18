<template>
    <div class="container mt-5">
      <h1 class="text-center">Welcome to User Auth App</h1>
      <div class="d-flex justify-content-center">
        <router-link to="/login" class="btn btn-primary mx-2">Login</router-link>
        <router-link to="/signup" class="btn btn-secondary mx-2">Sign Up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView'
  }
  </script>
  
  <style scoped>
  /* Add additional styling if needed */
  </style>
  
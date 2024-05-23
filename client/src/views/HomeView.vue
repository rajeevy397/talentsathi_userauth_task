<!-- HomeView.vue -->

<template>
  <!-- Main container for the home page content with a top margin -->
  <div class="container mt-5">
    <!-- Center-aligned text section -->
    <div class="text-center">
      <!-- Logo image with a margin at the bottom -->
      <img src="@/assets/logo.png" alt="Talent Sathi Logo" class="mb-4 logo" />
      <!-- Main heading for the home page -->
      <h1 class="display-4">Welcome to Talent Sathi</h1>
      <!-- Subheading/description text -->
      <p class="lead">A Software and IT Company</p>
    </div>
    <!-- Flex container to center the buttons -->
    <div class="d-flex justify-content-center mt-4">
      <!-- Router link to the login page styled as a primary large button -->
      <router-link to="/login" class="btn btn-primary btn-lg mx-2">Login</router-link>
      <!-- Router link to the signup page styled as a secondary large button -->
      <router-link to="/signup" class="btn btn-secondary btn-lg mx-2">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
// Export the default component definition
export default {
  // Name of the component
  name: 'HomeView'
}
</script>

<style scoped>
/* Styles specific to this component */
.logo {
  width: 150px; /* Set the width of the logo image */
  height: auto; /* Maintain the aspect ratio */
}
.container {
  text-align: center; /* Center-align text inside the container */
}
</style>

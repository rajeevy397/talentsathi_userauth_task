<template>
  <div class="container mt-5">
    <div class="text-center">
      <img src="@/assets/logo.png" alt="Talent Sathi Logo" class="mb-4 logo" />
      <h1 class="display-4">Welcome to Talent Sathi</h1>
      <p class="lead">A Software and IT Company</p>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <router-link to="/login" class="btn btn-primary btn-lg mx-2">Login</router-link>
      <router-link to="/signup" class="btn btn-secondary btn-lg mx-2">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.logo {
  width: 150px;
  height: auto;
}
.container {
  text-align: center;
}
</style>

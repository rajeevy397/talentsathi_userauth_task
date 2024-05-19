<template>
  <div class="container mt-5">
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="loginUser" class="w-50 mx-auto">
      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email" required>
      </div>
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../store';


export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  setup() {
    const store = useAuthStore();
    return { store };
  },
  methods: {
    async loginUser() {
      try {
        await this.store.login({ email: this.email, password: this.password });
        this.$router.push('/profile'); // Redirect to profile after successful login
      } catch (error) {
        console.error(error.response.data.message);
      }
    }
  }
}
</script>

<style scoped>
/* Add additional styling if needed */
</style>

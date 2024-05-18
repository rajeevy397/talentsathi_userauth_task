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

export default {
  name: 'SignUpView',
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const error = ref('');

    const signUpUser = async () => {
      try {
        isLoading.value = true;
        await store.signUp({ name: name.value, email: email.value, password: password.value });
        router.push('/profile'); // Redirect to profile page after signup
      } catch (error) {
        console.error('Error signing up:', error.response.data.message);
        error.value = error.response.data.message;
        isLoading.value = false;
      }
    };

    return {
      name,
      email,
      password,
      isLoading,
      error,
      signUpUser
    };
  }
}
</script>

<style scoped>
/* Add additional styling if needed */
</style>

<template>
  <div class="container mt-5">
    <h2 class="text-center">User Profile</h2>
    <div v-if="user" class="card w-50 mx-auto">
      <div class="card-body">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button @click="showEditModal" class="btn btn-warning mx-2">Edit</button>
        <button @click="deleteAccount" class="btn btn-danger mx-2">Delete Account</button>
        <button @click="logoutUser" class="btn btn-secondary mx-2">Logout</button>
      </div>
    </div>
    <div v-else-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else>
      <p class="text-center">Profile Updated Successfully!</p>
    </div>

    <!-- Edit Profile Modal -->
    <!-- Modal code goes here -->

  </div>
</template>

<script>
import { useAuthStore } from '../store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ProfileView',
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const isLoading = ref(false);

    const user = computed(() => store.user);

    const deleteAccount = async () => {
      if (confirm('Are you sure you want to delete your account?')) {
        try {
          isLoading.value = true;
          await store.deleteAccount();
          router.push('/login');
        } catch (error) {
          console.error('Error deleting account:', error);
          isLoading.value = false;
        }
      }
    };

    const logoutUser = () => {
      store.logout();
      router.push('/login');
    };

    return {
      user,
      isLoading,
      deleteAccount,
      logoutUser
    };
  }
}
</script>

<style scoped>
/* Add additional styling if needed */
</style>

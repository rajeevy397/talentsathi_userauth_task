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
    <div v-if="isEditModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit Profile</h2>
        <form @submit.prevent="submitEditProfile">
          <div class="mb-3">
            <input v-model="updatedName" type="text" class="form-control" placeholder="Name" required>
          </div>
          <div class="mb-3">
            <input v-model="updatedEmail" type="email" class="form-control" placeholder="Email" required>
            <div v-if="!isValidEmail(updatedEmail)" class="alert alert-danger mt-2" role="alert">
              Please enter a valid email address.
            </div>
          </div>
          <div class="mb-3">
            <input v-model="updatedPassword" type="password" class="form-control" placeholder="New Password">
            <div v-if="!isValidPassword(updatedPassword)" class="alert alert-warning mt-2" role="alert">
              Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default {
  name: 'ProfileView',
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const toast = useToast();

    const isEditModalVisible = ref(false);
    const updatedName = ref('');
    const updatedEmail = ref('');
    const updatedPassword = ref('');
    const isLoading = ref(false);
    const isProfileUpdated = ref(false);

    onMounted(async () => {
      console.log('ProfileView mounted');
      if (!store.user) {
        console.log('User not found in store, fetching user...');
        try {
          await store.fetchUser();
          if (store.user) {
            updatedName.value = store.user.name;
            updatedEmail.value = store.user.email;
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          store.logout();
          router.push('/login');
        }
      }
    });

    const user = computed(() => store.user);

    const showEditModal = () => {
      isEditModalVisible.value = true;
    };

    const closeEditModal = () => {
      isEditModalVisible.value = false;
    };

    const submitEditProfile = async () => {
      try {
        isLoading.value = true;
        await store.editProfile({
          name: updatedName.value,
          email: updatedEmail.value,
          password: updatedPassword.value
        });
        isProfileUpdated.value = true;
        isLoading.value = false;
        await store.fetchUser();
        toast.success('Profile updated successfully!');
        closeEditModal();
      } catch (error) {
        console.error('Failed to update profile:', error);
        toast.error('Failed to update profile');
        isLoading.value = false;
      }
    };

    const deleteAccount = async () => {
      try {
        isLoading.value = true;
        await store.deleteAccount();
        router.push('/');
        toast.success('Account Deleted successfully!');
      } catch (error) {
        console.error('Failed to delete account:', error);
        toast.error('Failed to delete account');
        isLoading.value = false;
      }
    };

    const logoutUser = () => {
      store.logout();
      router.push('/login');
    };

    const isValidEmail = (email) => {
      // Basic email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password) => {
      // Strong password validation
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    return {
      user,
      isLoading,
      isProfileUpdated,
      isEditModalVisible,
      updatedName,
      updatedEmail,
      updatedPassword,
      showEditModal,
      closeEditModal,
      submitEditProfile,
      deleteAccount,
      logoutUser,
      isValidEmail,
      isValidPassword
    };
  }
}
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

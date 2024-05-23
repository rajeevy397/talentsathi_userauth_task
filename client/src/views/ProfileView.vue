<!-- ProfileView.vue -->

<template>
  <!-- Main container for the profile view with a top margin -->
  <div class="container mt-5">
    <!-- Heading for the user profile -->
    <h2 class="text-center">User Profile</h2>
    <!-- Conditional rendering based on user data and loading state -->
    <div v-if="user" class="card w-50 mx-auto">
      <!-- Card body with user information -->
      <div class="card-body">
        <!-- Display user name and email -->
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <!-- Buttons for editing profile, deleting account, and logging out -->
        <button @click="showEditModal" class="btn btn-warning mx-2">Edit</button>
        <button @click="deleteAccount" class="btn btn-danger mx-2">Delete Account</button>
        <button @click="logoutUser" class="btn btn-secondary mx-2">Logout</button>
      </div>
    </div>
    <!-- Loading indicator while fetching user data -->
    <div v-else-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <!-- Success message after profile update -->
    <div v-else>
      <p class="text-center">Profile Updated Successfully!</p>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isEditModalVisible" class="modal">
      <div class="modal-content">
        <!-- Close button for the modal -->
        <span class="close" @click="closeEditModal">&times;</span>
        <!-- Heading for the edit profile form -->
        <h2>Edit Profile</h2>
        <!-- Form for editing profile information -->
        <form @submit.prevent="submitEditProfile">
          <!-- Input field for updated name -->
          <div class="mb-3">
            <input v-model="updatedName" type="text" class="form-control" placeholder="Name" required>
          </div>
          <!-- Input field for updated email -->
          <div class="mb-3">
            <input v-model="updatedEmail" type="email" class="form-control" placeholder="Email" required>
            <!-- Error message for invalid email format -->
            <div v-if="!isValidEmail(updatedEmail)" class="alert alert-danger mt-2" role="alert">
              Please enter a valid email address.
            </div>
          </div>
          <!-- Input field for new password -->
          <div class="mb-3">
            <input v-model="updatedPassword" type="password" class="form-control" placeholder="New Password">
            <!-- Error message for weak password -->
            <div v-if="!isValidPassword(updatedPassword)" class="alert alert-warning mt-2" role="alert">
              Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
            </div>
          </div>
          <!-- Submit button for saving changes -->
          <button type="submit" class="btn btn-primary w-100">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// Import necessary modules and components
import { useAuthStore } from '../store'; // Import the Auth store
import { onMounted, computed, ref } from 'vue'; // Import Vue Composition API functions
import { useRouter } from 'vue-router'; // Import Vue Router for navigation
import { useToast } from 'vue-toastification'; // Import Toastification for displaying toast messages

// Export the component definition
export default {
  // Name of the component
  name: 'ProfileView',
  // Setup function for composition API
  setup() {
    // Access to Auth store, router, and toast notification
    const store = useAuthStore();
    const router = useRouter();
    const toast = useToast();

    // Reactive variables for managing modal and form state
    const isEditModalVisible = ref(false);
    const updatedName = ref('');
    const updatedEmail = ref('');
    const updatedPassword = ref('');
    const isLoading = ref(false);
    const isProfileUpdated = ref(false);

    // Lifecycle hook to fetch user data on component mount
    onMounted(async () => {
      console.log('ProfileView mounted');
      // Check if user data is available in the store
      if (!store.user) {
        console.log('User not found in store, fetching user...');
        try {
          // Fetch user data from the backend
          await store.fetchUser();
          // Populate form fields with user data
          if (store.user) {
            updatedName.value = store.user.name;
            updatedEmail.value = store.user.email;
          }
        } catch (error) {
          // Handle error if user data fetching fails
          console.error("Failed to fetch user:", error);
          // Logout user and redirect to login page
          store.logout();
          router.push('/login');
        }
      }
    });

    // Computed property for accessing user data
    const user = computed(() => store.user);

    // Method to show the edit profile modal
    const showEditModal = () => {
      isEditModalVisible.value = true;
    };

    // Method to close the edit profile modal
    const closeEditModal = () => {
      isEditModalVisible.value = false;
    };

    // Method to submit edited profile information
    const submitEditProfile = async () => {
      try {
        // Set loading state to true
        isLoading.value = true;
        // Call API to update user profile
        await store.editProfile({
          name: updatedName.value,
          email: updatedEmail.value,
          password: updatedPassword.value
        });
        // Set profile updated state to true
        isProfileUpdated.value = true;
        // Reset loading state
        isLoading.value = false;
        // Fetch updated user data
        await store.fetchUser();
        // Display success toast message
        toast.success('Profile updated successfully!');
        // Close the edit profile modal
        closeEditModal();
      } catch (error) {
        // Log and display error message if profile update fails
        console.error('Failed to update profile:', error);
        toast.error('Failed to update profile');
        // Reset loading state
        isLoading.value = false;
      }
    };

    // Method to delete user account
    const deleteAccount = async () => {
      try {
        // Set loading state to true
        isLoading.value = true;
        // Call API to delete user account
        await store.deleteAccount();
        // Redirect to home page after successful deletion
        router.push('/');
        // Display success toast message
        toast.success('Account Deleted successfully!');
      } catch (error) {
        // Log and display error message if account deletion fails
        console.error('Failed to delete account:', error);
        toast.error('Failed to delete account');
        // Reset loading state
        isLoading.value = false;
      }
    };

    // Method to logout user
    const logoutUser = () => {
      // Call logout method from the store
      store.logout();
      // Redirect to login page
      router.push('/login');
    };

    // Method to validate email format
    const isValidEmail = (email) => {
      // Basic email validation using regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Method to validate password strength
    const isValidPassword = (password) => {
      // Strong password validation using regex
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    // Return variables and methods for use in the template
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
/* Scoped styles for the component */
.modal {
  display: block; /* Display modal block */
  position: fixed; /* Fixed position */
  z-index: 1; /* Set z-index */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Allow scrolling */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black with transparency */
}

.modal-content {
  background-color: #fefefe; /* Modal content background color */
  margin: 15% auto; /* Centered position */
  padding: 20px; /* Padding */
  border: 1px solid #888; /* Border */
  width: 80%; /* Modal content width */
}

.close {
  color: #aaa; /* Close button color */
  float: right; /* Align to the right */
  font-size: 28px; /* Font size */
  font-weight: bold; /* Bold font weight */
}

.close:hover,
.close:focus {
  color: black; /* Hover color */
  text-decoration: none; /* Remove text decoration */
  cursor: pointer; /* Pointer cursor */
}
</style>


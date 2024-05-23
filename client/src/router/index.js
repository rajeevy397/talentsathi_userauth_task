// router.js

// Import necessary modules and components
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory functions from Vue Router
import HomeView from '../views/HomeView.vue'; // Import HomeView component
import LoginView from '../views/LoginView.vue'; // Import LoginView component
import SignUpView from '../views/SignUpView.vue'; // Import SignUpView component
import ProfileView from '../views/ProfileView.vue'; // Import ProfileView component
import { useAuthStore } from '../store'; // Import useAuthStore function from store

// Define routes for the application
const routes = [
  { path: '/', component: HomeView }, // Route for home page
  { path: '/login', component: LoginView }, // Route for login page
  { path: '/signup', component: SignUpView }, // Route for sign up page
  { 
    path: '/profile', 
    component: ProfileView, // Route for profile page
    // Route guard to check if user is authenticated before accessing profile page
    beforeEnter: (to, from, next) => {
      const store = useAuthStore(); // Access Auth store
      // Redirect to login page if user is not authenticated
      if (!store.token) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next(); // Proceed to profile page if authenticated
      }
    }
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use web history mode
  routes, // Pass routes to the router
});

// Export router instance
export default router;

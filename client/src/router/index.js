// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import ProfileView from '../views/ProfileView.vue';
import { useAuthStore } from '../store';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignUpView },
  { 
    path: '/profile', 
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      const store = useAuthStore();
      if (!store.token) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { defineStore } from 'pinia';
import axios from '@/axios'; // Adjust the import based on your axios configuration

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async signUp(userData) {
      const response = await axios.post('/signup', userData);
      this.user = response.data.user;
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    },
    async login(userData) {
      const response = await axios.post('/login', userData);
      this.user = response.data.user;
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    },
    async fetchUser() {
      if (this.token) {
        try {
          console.log('Fetching user...');
          const response = await axios.get('/profile', {
            headers: { Authorization: `Bearer ${this.token}` }
          });
          console.log('User fetched:', response.data);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user profile:', error);
          this.logout();
        }
      }
    },
    async editProfile(updatedData) {
      const response = await axios.put('/profile', updatedData, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = response.data.user;
    },
    async deleteAccount() {
      await axios.delete('/profile', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    },
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    }
  }
});

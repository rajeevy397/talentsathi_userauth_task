import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async signUp(userData) {
      const response = await axios.post('/auth/signup', userData);
      this.user = response.data.user;
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    },
    async login(userData) {
      const response = await axios.post('/auth/login', userData);
      this.user = response.data.user;
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    },
    async fetchUser() {
      if (this.token) {
        const response = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.user = response.data.user;
      }
    },
    async editProfile(updatedData) {
      const response = await axios.put('/auth/profile', updatedData, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = response.data.user;
    },
    async deleteAccount() {
      await axios.delete('/auth/profile', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    }
  }
});

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Adjust the URL based on your backend server
});

export default instance;

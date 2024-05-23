// main.js

// Import necessary modules and components
import { createApp } from 'vue'; // Import the Vue framework
import App from './App.vue'; // Import the root App component
import router from './router'; // Import the router instance
import { createPinia } from 'pinia'; // Import Pinia for state management
import Toast, { POSITION } from 'vue-toastification'; // Import Toastification for notifications
import 'vue-toastification/dist/index.css'; // Import Toastification CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import 'bootstrap'; // Import Bootstrap JavaScript for interactive components

// Create a new Vue application instance with the root App component
const app = createApp(App);

// Use Pinia for state management
app.use(createPinia());

// Use the router instance for routing
app.use(router);

// Use Toastification for notifications with custom options
app.use(Toast, {
  position: POSITION.TOP_RIGHT, // Position of the toast notifications
  timeout: 3000, // Duration for the toast to be visible (3000 milliseconds = 3 seconds)
});

// Mount the Vue application to the HTML element with the id 'app'
app.mount('#app');

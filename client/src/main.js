import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JavaScript

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000, // Duration for the toast to be visible
});

app.mount('#app');

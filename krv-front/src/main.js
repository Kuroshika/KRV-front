
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import persistedState from 'pinia-plugin-persistedstate';
import axios from 'axios';


axios.defaults.baseURL = '/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN';

const app = createApp(App);
const pinia = createPinia();
pinia.use(persistedState); 
app.use(pinia);
app.use(router);

app.mount('#app')

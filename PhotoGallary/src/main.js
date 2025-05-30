import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PhotoFormPage from './components/PhotoFormPage';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';

const routes = [
  { path: '/', component: HomePage },
  { path: '/add-photo-form', component: PhotoFormPage },
  { path: '/edit-photo-form/:id', component: PhotoFormPage },
  { path: '/search', component: SearchPage }
]

const router = createRouter({
  history: createWebHistory('/gallery'),
  routes
})

const app = createApp(App)
app.use(router);
app.mount('#app')

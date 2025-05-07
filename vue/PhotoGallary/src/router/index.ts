import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import PhotoFormPage from '../components/PhotoFormPage.vue';
import SearchPage from '../components/SearchPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/add-photo-form',
    name: 'AddPhoto',
    component: PhotoFormPage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  }
];

const router = createRouter({
  history: createWebHistory('/gallery/'),
  routes
});

export default router;

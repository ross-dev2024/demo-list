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

// router/index.ts でトランジション設定を確認し、必要に応じて修正
const router = createRouter({
  history: createWebHistory('/gallery/'),
  routes,
  // ...
  scrollBehavior(to, from, savedPosition) {
    // スクロール動作の設定を確認
    return { top: 0 }
  }
})

export default router;
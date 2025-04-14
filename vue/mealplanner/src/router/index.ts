import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Planner from '../views/Planner.vue'
import Favorite from '../views/Favorite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite
    },
    {
      path: '/planner',
      name: 'planner',
      component: Planner
    }
  ]
})

export default router 
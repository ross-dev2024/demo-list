import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/planner',
      name: 'Planner',
      component: () => import('../views/Planner.vue')
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('../views/Recipes.vue')
    }
  ]
})

export default router 
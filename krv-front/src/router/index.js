import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomeView
    },
    {
      path: '/submissions',
      name: '投递列表',
      component: () => import('../views/SubmissionView.vue')
    },
    {
      path: '/about',
      name: '关于',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
      // component: AboutView
    },
    { path: '/submission/:id',component: () => import('../views/SubmissionDetailView.vue') },
    {
      path: '/submission/create',
      component: () => import('../views/SubmissionCreateView.vue')
    },
  ]
})

export default router

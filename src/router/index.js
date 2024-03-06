import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  activeClass: "router-active",
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/Dashboard',
      component: () => import('../views/dashboard.vue')
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard.vue')
    },
    {
      path: '/Transactions',
      name: 'transactions',
      component: () => import('../views/Transactions.vue')
    },
    {
      path: '/Groups',
      name: 'groups',
      component: () => import('../views/groups.vue')
    },
    {
      path: '/Import',
      name: 'import',
      component: () => import('../views/import.vue')
    },
    {
      path: '/Setting',
      name: 'setting',
      component: () => import('../views/settings.vue')
    }
  ]
})

export default router

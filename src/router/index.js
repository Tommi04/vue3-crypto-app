import { createRouter, createWebHashHistory } from 'vue-router'
// import CryptoList from '@/components/CryptoList';

import MainPage from '@/views/MainPage';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/crypto/:id',
    name: 'InfoPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/InfoPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

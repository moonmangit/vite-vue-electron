import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./layouts/HomeLayout.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('./pages/HomePage.vue')
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('./pages/AboutPage.vue')
        }
      ]
    }
  ]
})

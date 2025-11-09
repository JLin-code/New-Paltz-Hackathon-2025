import { createRouter, createWebHistory } from "vue-router";
import { routes, handleHotUpdate } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/index.vue'),
    },
    {
      path: '/BoutonHall',
      name: 'BoutonHall',
      component: () => import('../pages/BoutonHall.vue'),
    },
    {
      path: '/AwoostingHall',
      name: 'AwoostingHall',
      component: () => import('../pages/AwoostingHall.vue'),
    },
    {
      path: '/RidgeviewHall',
      name: 'RidgeviewHall',
      component: () => import('../pages/RidgeviewHall.vue'),
    },
    {
      path: '/EsopusHall',
      name: 'EsopusHall',
      component: () => import('../pages/EsopusHall.vue'),
    },
  ]
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;

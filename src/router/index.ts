import { RouteRecordRaw, createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/first',
    name: 'first',
    component: () => import('../views/first.vue'),
  },
  {
    path: '/second',
    name: 'second',
    component: () => import('../views/second.vue'),
  },
  {
    path: '/three',
    name: 'three',
    component: () => import('../views/three.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;


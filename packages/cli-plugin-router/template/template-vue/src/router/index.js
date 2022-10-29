import { createRouter, <%= data.history %>, RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
  },
];

const router = createRouter({
  history: <%= data.history %> (<% if (data.history) { -%> process.env.BASE_URL <% } -%>),
routes
});

export default router;

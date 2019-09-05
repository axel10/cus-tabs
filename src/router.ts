import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/index.vue';
import MultiInstance from './views/MultiInstance/index.vue';
import News from '@/views/News/index.vue';
import Dynamic from '@/views/Dynamic/index.vue';
import Custom from '@/views/Custom/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/news',
      name: 'news',
      component: News,
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: Dynamic,
    },
    {
      // path: Custom
      path: '/custom',
      name: 'custom',
      component: Custom,
    },
    {
      path: '/multi-instance',
      name: 'multi-instance',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      component: MultiInstance,
    },
  ],
});

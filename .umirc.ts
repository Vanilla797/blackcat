import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/list',
      component: '@/pages/List/List',
    },
    {
      path: '/login',
      component: '@/pages/Login/Login',
    },
    { path: '/detail/:id', exact: true, component: '@/pages/Detail/Detail' },
    {
      path: '/me',
      component: '@/pages/Me/Me',
    },
    { component: '@/pages/404' },
  ],
  locale: {
    default: 'en-US',
  },
  fastRefresh: {},
});

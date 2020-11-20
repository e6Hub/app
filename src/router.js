import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search.vue')
    },
    {
      path: '/searchpools',
      name: 'searchpools',
      component: () => import('@/views/SearchPools.vue')
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: () => import('@/views/Downloads.vue')
    },
    {
      path: '/settings',
      component: () => import('@/views/Settings.vue'),
      children: [
        {
          path: 'downloads',
          name: 'settings.downloads',
          component: () => import('@/views/Settings/Downloads.Settings.vue')
        },
        {
          path: 'appearance',
          name: 'settings.appearance',
          component: () => import('@/views/Settings/Appearance.Settings.vue')
        },
        {
          path: 'plugins',
          name: 'settings.plugins',
          component: () => import('@/views/Settings/Plugins.Settings.vue')
        },
        {
          path: 'about',
          name: 'settings.about',
          component: () => import('@/views/Settings/About.Settings.vue')
        }
      ]
    },
    {
      path: '/postview/:id',
      name: 'postView',
      props: true,
      component: () => import('@/views/PostView.vue')
    },
    {
      path: '/poolview/:id',
      name: 'poolView',
      props: true,
      component: () => import('@/views/PoolView.vue')
    },
    {
      path: '*',
      redirect: '/search'
    }
  ]
})
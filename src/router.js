import Vue from 'vue';
import Router from 'vue-router';

import Search from '@/views/Search.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'search',
            component: Search
        },
        {
            path: '/downloads',
            name: 'downloads',
            component: () => import('@/views/Downloads.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/Settings.vue')
        },
        {
            path: '/postview',
            name: 'postView',
            props: true,
            component: () => import('@/views/PostView.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
  })
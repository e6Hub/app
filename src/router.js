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
            path: '/downloads',
            name: 'downloads',
            component: () => import('@/views/Downloads.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/Settings.vue'),
            children: [
                {
                    path: 'downloadsSettings',
                    alias: '',
                    component: () => import('@/views/Settings/Downloads.Settings.vue')
                },
                {
                    path: 'RPCSettings',
                    component: () => import('@/views/Settings/DiscordRPC.Settings.vue')
                },
                {
                    path: 'appVersion',
                    component: () => import('@/views/Settings/AppVersion.Settings.vue')
                }
            ]
        },
        {
            path: '/postview',
            name: 'postView',
            props: true,
            component: () => import('@/views/PostView.vue')
        },
        {
            path: '*',
            redirect: '/search'
        }
    ]
  })
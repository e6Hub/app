import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import VueFeather from 'vue-feather';

Vue.prototype.$events = new Vue();
Vue.use(VueFeather);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
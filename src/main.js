import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFeather from 'vue-feather';

import './assets/app.css';

import Updater from './plugins/updater';
import RPC from './plugins/rpc';

Vue.prototype.$events = new Vue();

// Third party modules

Vue.use(VueFeather);
// App plugins
Vue.use(Updater);
Vue.use(RPC);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
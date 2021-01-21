import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFeather from 'vue-feather';
import i18n from './i18n';

import './assets/app.css';

import Updater from './plugins/updater';
import Platform from './plugins/platform';
import PluginManager from './pluginman';

Vue.prototype.$events = new Vue();

// Third party modules
Vue.use(VueFeather);

// App plugins
Vue.use(Updater);
Vue.use(Platform);
Vue.use(PluginManager);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
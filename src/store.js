import Vue from 'vue'
import Vuex from 'vuex'
import persist from 'vuex-persist'

Vue.use(Vuex);

import plugins from './modules/plugins.store';
import search from './modules/search.store';
import settings from './modules/settings.store';

import pools from './modules/pools.store';
import posts from './modules/posts.store';
import downloads from './modules/downloads.store';
import updater from './modules/updater.store';

const storePersist = new persist({
  key: 'vuex',
  storage: window.localStorage,
  modules: [
    'plugins',
    'search',
    'settings'
  ]
});

export default new Vuex.Store({
  plugins: [storePersist.plugin],
  modules: {
    // Perstist modules
    plugins,
    search,
    settings,
    // Session modules (non-persist)
    pools,
    posts,
    downloads,
    updater
  }
});
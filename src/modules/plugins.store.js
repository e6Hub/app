/**
 * This is the main entry file of Settings store module,
 * the purpose of this file is store app's third party
 * plugins. This file should be used in
 * /views/Plugins.Settings.vue.
 */

/**
 * This is a shortcut to console.log,
 * for Plugins store module.
 * @param {String} s Text to print
 */
function l(s) {
  console.log(`%c[Plugins/Store]%c ${s}`, 'color:#C6F', '');
}

export default {
  namespaced: true,
  state: {
    pluginsDir: '',
    plugins: [],
    enabled: true
  },
  mutations: {
    _setPluginsDir(state, v) {
      l(`Directory set to ${v}`);
      state.pluginsDir = v;
    },
    _addPlugin(state, o) {
      if (state.plugins.findIndex(p => p.path == o.path) > -1) return l(`The "${o.meta.name}" plugin seems is already added`);
      state.plugins.push(o);
    },
    _delPlugin(state, o) {
      const i = state.plugins.findIndex(p => p.path == o.path);
      if (i === -1) return l(`The "${o.meta.name}" plugin don't exists in the plugins store`);
      state.plugins.splice(i, 1);
    },
    _enablePlugin(state, pathToPlugin) {
      state.plugins.find(p => p.path === pathToPlugin).enabled = true;
    },
    _disablePlugin(state, pathToPlugin) {
      state.plugins.find(p => p.path === pathToPlugin).enabled = false;
    },
    _clearPlugins(state) {
      l('Plugins store\'s state cleared')
      state.plugins = [];
    }
  },
  actions: {
    setPluginsDir({ commit }, v) {
      commit('_setPluginsDir', v);
    },
    addPlugin({ commit }, o) {
      commit('_addPlugin', o);
    },
    delPlugin({ commit }, o) {
      commit('_delPlugin', o);
    },
    enablePlugin({ commit }, pluginPath) {
      commit('_enablePlugin', pluginPath);
    },
    disablePlugin({ commit }, pluginPath) {
      commit('_disablePlugin', pluginPath);
    },
    clearPlugins({ commit }) {
      commit('_clearPlugins');
    }
  },
  getters: {
    pluginsDir: state => state.pluginsDir,
    plugins: state => state.plugins,
    enabledPlugins: state => state.plugins.filter(p => p.enabled),
    disabledPlugins: state => state.plugins.filter(p => !p.enabled)
  }
}
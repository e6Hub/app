import Vue from 'vue'
import Vuex from 'vuex'
import persist from 'vuex-persist'

Vue.use(Vuex);

const storePersist = new persist({
  key: 'vuex',
  storage: window.localStorage
});

function defaultSettings() {
  return {
    downloadLocation: require('os').userInfo().homedir,
    titlebarStyle: 'win10',
    blurNsfw: false,
    unblurNsfw: 'onhover',
    searchViewMode: 'compact'
  }
}

function log(s, id) {
  if (id) console.log(`%c[${id}]%c ${s}`, 'color:#AC4FE5', '')
  else console.log(s);
}

export default new Vuex.Store({
  state: {
    tags: '',
    postId: 0,
    settings: defaultSettings(),
    updateStatus: 'NULL',
    postsList: [],
    pluginsDir: '',
    plugins: []
  },
  mutations: { // Intern actions
    _setTags(state, _tags) {
      state.tags = _tags;
    },
    _setPostId(state, _id) {
      state.postId = _id;
    },
    _setSetting(state, obj) {
      log(`<${obj.key}> changed to "${obj.value}"`, 'Settings');
      state.settings[obj.key] = obj.value;
    },
    _resetSettings(state) {
      const defaults = defaultSettings()
      Object.keys(defaults).forEach(key => {
        state.settings[key] = defaults[key]
      });
      log(`Settings restored`, 'Settings');
    },
    _verifySettings(state) {
      if (!state.settings || typeof state.settings != 'object') this._resetSettings(state);
    },
    _setUpdateStatus(state, v) {
      state.updateStatus = v;
    },
    _setPostsList(state, v) {
      if (Array.isArray(v)) state.postsList = v;
      else if (typeof v === 'string') state.postsList.push(v);
    },
    _setPluginsDir(state, v) {
      state.pluginsDir = v;
    },
    _addPlugin(state, o) {
      if (state.plugins.findIndex(p => p.path == o.path) > -1) return console.log(`The "${o.meta.name}" plugin seems is already added`);
      state.plugins.push(o);
    },
    _delPlugin(state, o) {
      const i = state.plugins.findIndex(p => p.path == o.path);
      if (i === -1) return console.log(`The "${o.meta.name}" plugin don't exists in the plugins store`);
      state.plugins.splice(i, 1);
    },
    _enablePlugin(state, pathToPlugin) {
      state.plugins.find(p => p.path === pathToPlugin).enabled = true;
    },
    _disablePlugin(state, pathToPlugin) {
      state.plugins.find(p => p.path === pathToPlugin).enabled = false;
    },
    _clearPlugins(state) {
      state.plugins = [];
    }
  },
  actions: { // Public actions
    setTags({ commit }, tags) {
      commit('_setTags', tags);
    },
    setPostId({ commit }, postId) {
      commit('_setPostId', postId);
    },
    setSetting({ commit }, nS) {
      commit('_setSetting', nS);
    },
    resetSettings({ commit }) {
      commit('_resetSettings');
    },
    verifySettings({ commit }) {
      commit('_verifySettings');
    },
    setUpdateStatus({ commit }, v) {
      commit('_setUpdateStatus', v);
    },
    setPostsList({ commit }, v) {
      commit('_setPostsList', v);
    },
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
  getters: { // Getters
    tags: state => {
      return state.tags;
    },
    tagsArray: state => {
      return state.tags.split(' ');
    },
    postId: state => {
      return state.postId;
    },
    settings: state => {
      return state.settings;
    },
    setting: state => kN => {
      return state.settings[kN];
    },
    updateStatus: state => {
      return state.updateStatus;
    },
    postsList: state => {
      return state.postsList;
    },
    pluginsDir: state => {
      return state.pluginsDir;
    },
    plugins: state => {
      return state.plugins;
    },
    enabledPlugins: state => {
      return state.plugins.filter(p => p.enabled);
    },
    disabledPlugins: state => {
      return state.plugins.filter(p => !p.enabled);
    }
  },
  plugins: [storePersist.plugin]
});
import Vue from 'vue';
import fs from 'fs';

/**
 * This is the main entry file of Settings store module,
 * the purpose of this file is store app's settings with
 * persisted states. This file handles UI changes and data
 * that appears in Settings views.
 */

/**
 * This is a shortcut to console.log,
 * for Settings store module.
 * @param {String} s Text to print
 */
function l(s) {
  console.log(`%c[Settings/Store]%c ${s}`, 'color:#A4E', '');
}

function defaultSettings() {
  return {
    downloadLocation: require('os').userInfo().homedir,
    titlebarStyle: 'win10',
    blurNsfw: false,
    unblurNsfw: 'onhover',
    searchViewMode: 'compact'
  }
}

export default {
  namespaced: true,
  state: {
    settings: defaultSettings()
  },
  mutations: {
    _setSetting(state, obj) {
      l(`<${obj.key}> changed to "${obj.value}"`);
      Vue.set(state.settings, obj.key, obj.value);
    },
    _resetSettings(state) {
      const defaults = defaultSettings()
      Object.keys(defaults).forEach(key => {
        Vue.set(state.settings, key, defaults[key]);
      });
      l('Settings restored');
    },
    _verifySettings(state) {
      if (!state.settings || typeof state.settings != 'object') {
        l('Invalid settings found, reseting');
        return this._resetSettings(state);
      }
      
      if (!fs.existsSync(state.settings.downloadLocation)) {
        l('Custom download folder don\'t exists. Restoring to default...');
        Vue.set(state.settings, 'downloadLocation', defaultSettings().downloadLocation);
      }
    },
  },
  actions: {
    setSetting({ commit }, obj) {
      commit('_setSetting', obj);
    },
    resetSettings({ commit }) {
      commit('_resetSettings');
    },
    verifySettings({ commit }) {
      commit('_verifySettings');
    }
  },
  getters: {
    settings: state => state.settings,
    setting: state => key => state.settings[key]
  }
}
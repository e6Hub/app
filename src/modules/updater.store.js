/**
 * This is the main entry file of Updater store module,
 * the purpose of this file is sync updater's statuses with
 * the foreground process. The data stored in this module
 * isn't persisted.
 */

/**
 * This is a shortcut to console.log,
 * for Updater store module.
 * @param {String} s Text to print
 */
function l(s) {
  console.log(`%c[Updater/Store]%c ${s}`, 'color:#0AF', '');
}

export default {
  namespaced: true,
  state: {
    updateStatus: null
  },
  mutations: {
    _setUpdateStatus(state, v) {
      state.updateStatus = v;
    }
  },
  actions: {
    setUpdateStatus({ commit }, v) {
      commit('_setUpdateStatus', v);
    }
  },
  getters: {
    updateStatus: state => state.updateStatus
  }
}
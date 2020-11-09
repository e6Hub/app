/**
 * This is the main entry file of Search store module,
 * the purpose of this file is store fetched posts after
 * a search operation. Saves the post ID and the list
 * of fetched posts on current session.
 */

/**
 * This is a shortcut to console.log,
 * for Posts store module.
 * @param {String} s Text to print
 */
function l(s) {
  console.log(`%c[Posts/Store]%c ${s}`, 'color:#15D', '');
}

export default {
  namespaced: true,
  state: {
    id: 0,
    list: []
  },
  mutations: {
    _setId(state, v) {
      if (typeof v !== 'number') return l(`Failed to update id state, value number expected but got ${typeof v}.`);
      state.id = v;
      l(`ID set to ${v}`);
    },
    _setList(state, v) {
      if (!Array.isArray(v)) return l(`Failed to update list state, value array expected but got ${typeof v}.`);
      state.list = v;
      l(`List updated`);
    }
  },
  actions: {
    setId({ commit }, n) {
      commit('_setId', n);
    },
    setList({ commit }, a) {
      commit('_setList', a);
    }
  },
  getters: {
    id: state => state.id,
    list: state => state.list
  }
}
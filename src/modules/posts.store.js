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
      if (typeof v !== 'number') return l(`Number expected but got ${typeof v}.`);
      state.id = v;
      l(`ID set to ${v}`);
    },
    _setList(state, a) {
      if (!Array.isArray(a)) return l(`Aray expected but got ${typeof a}.`);
      state.list = a;
      l('List updated');

    },
    _pushToList(state, o) {
      if (o.constructor.name !== 'Object') return l(`Object expected but got ${a.constructor.name}.`);
      if (state.list.findIndex(p => p.id === o.id) > -1) return l('Object value cannot be added because another object has the same post ID.')
      state.list.push(o);
      l(`Append post #${o.id} to list`);
    },
    _delFromList(state, id) {
      if (state.list.findIndex(p => p.id === id) === -1) return l(`Object post #${id} not found at list.`);
      state.list.splice(state.list.findIndex(p => p.id === id), 1);
      l(`Remove post #${id} from list`);
    }
  },
  actions: {
    setId({ commit }, n) {
      commit('_setId', n);
    },
    setList({ commit }, a) {
      commit('_setList', a);
    },
    pushToList({ commit }, o) {
      commit('_pushToList', o);
    },
    delFromList({ commit }, n) {
      commit('_delFromList', n);
    },
  },
  getters: {
    id: state => state.id,
    list: state => state.list
  }
}
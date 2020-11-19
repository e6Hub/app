/**
 * This is the main entry file of Search store module,
 * the purpose of this file is store search's options.
 * This doesn't apply UI changes, for that check the
 * Setting module and Settings' views.
 */

/**
 * This is a shortcut to console.log,
 * for Search store module.
 * @param {String} s Text to print
 */
function l(s) {
  console.log(`%c[Search/Store]%c ${s}`, 'color:#F57', '');
}

function defaultOptions() {
  return {
    posts: {
      tags: '', // {String} any
      rating: null, // {String} e, q, s
      score: null, // {Number} any
      scorePointer: null, // {String} >, >=, <, <=, = (null)
      fav: null, // {Number} any
      favPointer: null, // {String} >, >=, <, <=, = (null)
      duration: null, // {Number} any
      durationPointer: null, // {String} >, >=, <, <=, = (null)
      type: null, // {String} jpg, png, gif, webp, swf
      status: 'any', // {String} pending, active, deleted, flagged, (any)
      has: {
        source: null, // {Boolean|null}
        description: null, // {Boolean|null}
      },
      inpool: null // {Boolean|null}
    },
    pools: {
      name: '', // {String} any
      creator: '', // {String} any
      isActive: null, // {Boolean|null}
      category: '', // {String} series, collection
      order: 'updated_at' // {String} name, created_at, updated_at, post_count
    }
  }
}

export default {
  namespaced: true,
  state: {
    options: defaultOptions()
  },
  mutations: {
    _setTags(state, v) {
      state.options.posts.tags = v;
    },
    _setRating(state, v) {
      const allowedRatings = ['e', 'q', 's'];
      if (allowedRatings.indexOf(v.toLowerCase()) < 0) return l(`Invalid rating, got ${v}`);
      state.options.posts.rating = v;
    },
    _setPoolName(state, v) {
      state.options.pools.name = v;
    },
    _resetOptions(state) {
      const defaults = defaultOptions();
      Object.keys(defaults).forEach(key => {
        state.options[key] = defaults[key]
      });
      log('Search options restored');
    }
  },
  actions: {
    setTags({ commit }, tags) {
      commit('_setTags', tags);
    },
    setRating({ commit }, rating) {
      commit('_setRating', rating);
    },
    setPoolName({ commit }, name) {
      commit('_setPoolName', name);
    },
    resetOptions({ commit }) {
      commit('_resetOptions');
    }
  },
  getters: {
    searchOptions: state => state.options,
    tags: state => state.options.posts.tags,
    tagsArray: state => state.options.posts.tags.split(' '),
    rating: state => state.options.posts.rating,
    poolName: state => state.options.pools.name
  }
}
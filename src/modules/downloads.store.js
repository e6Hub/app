/**
 * This is the main entry file of Settings store module,
 * the purpose of this file is store app's downloads.
 * This file handles post downloads, this file should be
 * used in /views/Downloads.vue.
 */

/**
 * This is a shortcut to console.log,
 * for Downloads store module.
 * @param {String} s Text to print
 */
function l(s) {
  console.log(`%c[Downloads/Store]%c ${s}`, 'color:#8C4', '');
}

export default {
  namespaced: true,
  state: {
    queuePosts: [],
    queuePools: []
  },
  mutations: {
    // Posts mutations
    _addQueuePost(state, postObject) {
      if (!postObject.file.url) return l(`No url file found for ${postObject.id} post, aborting download...`);
      postObject.status = 'downloading';
      postObject.progress = 0;

      state.queuePosts.push(postObject);
    },
    // Pools mutations
    _addQueuePool(state, poolObject) {
      if (!postObject.posts) return l(`No posts found in ${poolObject.id} pool, aborting download...`);
      postObject.status = 'downloading';
      postObject.progress = 0;

      state.queuePools.push(poolObject)
    }
  },
  actions: {
    // Posts actions
    addQueuePost({commit}, o) {
      commit('_addQueuePost', o);
    },
    // Pools actions
    addQueuePool({ commit }, o) {
      commit('_addQueuePool', o);
    }
  },
  getters: {
    // Posts
    queuePosts: state => state.queuePosts,
    queuePostsDone: state => state.queuePosts.filter(q => q.status === 'done'),
    queuePostsDownloading: state => state.queuePosts.filter(q => q.status === 'downloading'),
    queuePostsError: state => state.queuePosts.filter(q => q.status === 'error'),
    // Pools
    queuePools: state => state.queuePools,
    queuePoolsDone: state => state.queuePools.filter(q => q.status === 'done'),
    queuePoolsDownloading: state => state.queuePools.filter(q => q.status === 'downloading'),
    queuePoolsError: state => state.queuePools.filter(q => q.status === 'error')
  }
}
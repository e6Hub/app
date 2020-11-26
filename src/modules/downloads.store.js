import Vue from "vue";

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
    lastTime: 0,
    queuePosts: [],
    queuePools: []
  },
  mutations: {
    _updateLastTime(state) {
      state.lastTime = new Date().getTime();
    },
    // Posts mutations
    _addQueuePost(state, postObject) {
      if (!postObject.file.url) return l(`No url file found for ${postObject.id} post, aborting download...`);
      postObject.status = 'pending';
      postObject.progress = 0;

      state.queuePosts.push(postObject);
    },
    _updatePost(state, postObject) {
      const postIndex = state.queuePosts.findIndex(post => post.id === postObject.id);
      Vue.set(state.queuePosts, postIndex, postObject);
    },
    // Pools mutations
    _addQueuePool(state, poolObject) {
      if (!poolObject.posts) return l(`No posts found in ${poolObject.id} pool, aborting download...`);
      poolObject.status = 'pending';
      poolObject.progress = 0;

      state.queuePools.push(poolObject)
    },
    _updatePool(state, poolObject) {
      const poolIndex = state.queuePools.findIndex(pool => pool.id === poolObject.id);
      Vue.set(state.queuePools, poolIndex, poolObject);
    }
  },
  actions: {
    updateLastTime({commit}) {
      commit('_updateLastTime');
    },
    // Posts actions
    addQueuePost({commit}, o) {
      commit('_addQueuePost', o);
    },
    updatePost({commit}, o) {
      commit('_updatePost', o);
    },
    // Pools actions
    addQueuePool({commit}, o) {
      commit('_addQueuePool', o);
    },
    updatePool({commit}, o) {
      commit('_updatePool', o);
    }
  },
  getters: {
    lastTime: state => state.lastTime,
    // Posts
    queuePosts: state => state.queuePosts,
    queuePostsPending: state => state.queuePosts.filter(q => q.status === 'pending'),
    queuePostsDone: state => state.queuePosts.filter(q => q.status === 'done'),
    queuePostsDownloading: state => state.queuePosts.filter(q => q.status === 'downloading'),
    queuePostsError: state => state.queuePosts.filter(q => q.status === 'error'),
    // Pools
    queuePools: state => state.queuePools,
    queuePoolsPending: state => state.queuePools.filter(q => q.status === 'pending'),
    queuePoolsDone: state => state.queuePools.filter(q => q.status === 'done'),
    queuePoolsDownloading: state => state.queuePools.filter(q => q.status === 'downloading'),
    queuePoolsError: state => state.queuePools.filter(q => q.status === 'error')
  }
}
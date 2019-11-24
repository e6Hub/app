import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        searching: false,
        isDownloading: false,
        downloadQueue: []
    },
    mutations: {
        toggleSearchState(v) {
            state.searching = v;
        }
    },
    actions: {

    }
});
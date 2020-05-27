import Vue from 'vue'
import Vuex from 'vuex'
import persist from 'vuex-persist'

Vue.use(Vuex);

const storePersist = new persist({
    key: 'vuex',
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        tags: '',
        postId: 0,
        settings: {
            downloadLocation: require('os').userInfo().homedir,
            titlebarStyle: 'win10'
        },
        updateStatus: 'NULL',
        postsList: []
    },
    mutations: { // Intern actions
        _setTags(state, _tags) {
            state.tags = _tags;
        },
        _setPostId(state, _id) {
            state.postId = _id;
        },
        _setSetting(state, obj) {
            console.log(`%c[Settings]%c <${obj.key}> changed to "${obj.value}"`, 'color:#AC4FE5', '')
            state.settings[obj.key] = obj.value;
        },
        _resetSettings(state) {
            state.settings = {
                downloadLocation: require('os').userInfo().homedir,
                titlebarStyle: 'win10'
            }
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
        }
    },
    actions: { // Public actions
        setTags({commit}, tags) {
            commit('_setTags', tags);
        },
        setPostId({commit}, postId) {
            commit('_setPostId', postId);
        },
        setSetting({commit}, nS) {
            commit('_setSetting', nS);
        },
        resetSettings({commit}) {
            commit('_resetSettings');
        },
        verifySettings({commit}) {
            commit('_verifySettings');
        },
        setUpdateStatus({commit}, v) {
            commit('_setUpdateStatus', v);
        },
        setPostsList({commit}, v) {
            commit('_setPostsList', v);
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
        }
    },
    plugins: [storePersist.plugin]
});
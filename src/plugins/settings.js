import store from '../store';
/**
 * Settings default object
 */
const settingsDefault = {
    rpcEnabled: false,
    rpcShowSearching: false,
    rpcShowWatching: false,
    downloadLocation: require('os').userInfo().homedir
};
/**
 * The main controller for the app's settings.
 */
const settingsController = {
    /**
     * Returns the settings' object.
     */
    read() {
        return JSON.parse(localStorage.settings);
    },
    /**
     * Gets a value of settings by a keyname, if there's none
     * it will return the settings' object.
     * @param {String} kn The keyname to find.
     */
    get(kn) {
        return kn ? eval(`this.read().${kn}`) : this.read();
    },
    /**
     * Sets a value for a specified key.
     * @param {Sring} kn The keyname for the setting
     * @param {*} v The value for the key
     * @returns The specified value or undefined (if an error ocurred)
     */
    set(kn, v) {
        'use strict';
        if (typeof kn !== 'string') return;
        let root = this.read();

        try {
            root[kn] = v;
        } catch(e) {
            return;
        }

        localStorage.settings = JSON.stringify(root);
        return v;
    },
    /**
     * Resets settings to default.
     */
    toDefault() {
        localStorage.settings = JSON.stringify(settingsDefault);
        console.log('[Settings] Restored to default.');
    },
    /**
     * Verify if settings are defined
     */
    verify() {
        if (!localStorage.settings) return this.toDefault();

        try {
            this.read()
        } catch(e) {
            return this.toDefault();
        }
        console.log('[Settings] OK');
    }
};

const settingsPlugin = {
    /**
     * Get ready the settings plugin for the app
     * @param {Object} Vue A Vue instance
     */
    install(Vue) {
        Vue.prototype.$readSettings = settingsController.read;
        Vue.prototype.$getSetting = (kN) => { return settingsController.get.bind(settingsController, kN)(); };
        Vue.prototype.$setSetting = settingsController.set.bind(settingsController);
        Vue.prototype.$resetSettings = settingsController.toDefault;
        Vue.prototype.$verifySettings = settingsController.verify.bind(settingsController);
    }
}

export default settingsPlugin;
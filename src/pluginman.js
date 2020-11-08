/* Plugin manager for the render-process */
import fs from 'fs'
import path from 'path'
import store from './store';

class PluginError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'PluginError';
  }
}

const pluginManager = {
  // Misc
  /**
   * Print something with the "PluginManager" label.
   * @param {String} s The text to print
   */
  l(s) {
    if (typeof s === 'object') s = JSON.stringify(s, null, 4);
    console.log(`%c[PluginManager]%c ${s}`, 'color: #C6F;', '')
  },
  /**
   * Print something with the "PluginManager" label, but
   * in this function the label is red. Use this
   * if you want to show an error.
   * @param {String} s The text to print
   */
  e(s) {
    if (typeof s === 'object') s = JSON.stringify(s, null, 4);
    console.log(`$c[PluginManager]$c ${s}`, 'color: #F67;', '')
  },
  // Main methods
  /**
   * Discovers and stores the plugins directory.
   */
  getPluginsDir() {
    const { app } = require('electron').remote;
    let appdata = app.getPath('userData');
    this.dir = path.join(appdata, 'plugins/');
    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
    store.dispatch('setPluginsDir', this.dir);
  },
  /**
   * Gets and stores all plugins located in the plugins directory.
   */
  getPlugins() {
    this.plugins = fs.readdirSync(this.dir)
      .filter(f => f.endsWith('.js'))
      .map(p => {
        let plg = __non_webpack_require__(this.dir + p);
        plg.enabled = false;
        plg.path = this.dir + p;
        return plg;
      });

    this.plugins.forEach(plugin => {
      store.dispatch('addPlugin', plugin);
    });

    store.getters.enabledPlugins.forEach(plugin => {
      if (!fs.existsSync(plugin.path)) {
        this.l(`<${plugin.meta.name}> is enabled but missing! removing from app...`);
        store.dispatch('delPlugin', plugin);
        return;
      }
      this.l(`<${plugin.meta.name}> is enabled!`);
      this.loadPlugin(plugin.path);
    })
  },
  /**
   * Removes the plugin from the Vuex store and deletes the script file if it's exists.
   * @param {Object} plugin Plugin object
   */
  removePlugin(plugin) {
    try {
      const wasEnabled = store.getters.enabledPlugins.findIndex(p => p.path === plugin.path) > -1;
      delete __non_webpack_require__.cache[__non_webpack_require__.resolve(plugin.path)];
      store.dispatch('delPlugin', plugin);
      if (fs.existsSync(plugin.path)) fs.unlinkSync(plugin.path);
      if (wasEnabled) location.reload();
    } catch (err) {
      throw new PluginError(`The plugin at <${plugin.path}> couldn\'t be removed: ${err}`)
    }
  },
  /**
   * Loads the plugins, call the function "execute"
   * @param {String} pluginPath Path to plugin
   */
  loadPlugin(pluginPath) {
    const pluginObject = this.plugins.find(p => p.path == pluginPath);
    const pluginExists = !!pluginObject;

    if (!pluginExists) throw new PluginError(`"${pluginPath}" doesn't exists!`);

    this.l(`Loading <${pluginPath}>...`);
    if (store.getters.enabledPlugins.findIndex(p => p.path === pluginPath) === -1) store.dispatch('enablePlugin', pluginPath);

    pluginObject.execute();
    // TODO: Background execute
  },
  /**
   * Unloads the plugin, refresh the app automatically.
   * @param {String} pluginPath Path to plugin
   */
  unloadPlugin(pluginPath) {
    try {
      delete __non_webpack_require__.cache[__non_webpack_require__.resolve(pluginPath)];
      store.dispatch('disablePlugin', pluginPath);
      location.reload();
    } catch (err) {
      throw new PluginError(`The plugin at <${pluginPath}> couldn\'t be unloaded: ${err}`);
    }
  },
  /**
   * Inits the Plugin Manager.
   */
  init() {
    this.getPluginsDir();
    this.getPlugins();
  },
  /**
   * Get ready the plugin manager for the app
   * @param {Object} Vue A Vue instance
   */
  install(Vue) {
    Vue.prototype.$initPluginMan = this.init.bind(pluginManager);
    Vue.prototype.$refreshPlugins = this.getPlugins.bind(pluginManager);
    Vue.prototype.$loadPlugin = (plgPath) => this.loadPlugin.bind(pluginManager, plgPath)();
    Vue.prototype.$unloadPlugin = (plgPath) => this.unloadPlugin.bind(pluginManager, plgPath)();
    Vue.prototype.$removePlugin = (plg) => this.removePlugin.bind(pluginManager, plg)();
  }
}

export default pluginManager
import { ipcRenderer } from 'electron';
import store from '../store';

const updaterController = {
  // Misc
  /**
   * Print something with the "Updater" label.
   * @param {String} s The text to print
   */
  l(s) {
    console.log(`%c[Updater/Plugin]%c ${s}`, 'color: #0AF;', '')
  },
  /**
   * Print something with the "Updater" label, but
   * in this function the label is red. Use this
   * if you want to show an error.
   * @param {String} s The text to print
   */
  e(s) {
    console.log(`$c[Updater/Plugin]$c ${s}`, 'color: #F00;', '')
  },
  // Setters
  /**
   * Sets the status for the current update.
   * @param {String} v The status string.
   */
  setStatus(v) {
    store.dispatch('updater/setUpdateStatus', v);
  },
  // Main methods
  /**
   * Init the updater controller and defines
   * the events with ipcRenderer.
   */
  init() {
    const supportedPlatforms = ['win32', 'linux'];
    this.l(`Initialized on <${process.platform}> platform`);

    if (process.env.NODE_ENV !== 'production') {
      this.l('Development build');
      this.setStatus('dev');
    }

    if (supportedPlatforms.indexOf(process.platform) === -1) {
      this.l(`Unsupported build for platform: ${process.platform}`);
      this.setStatus('unsupported');
    }

    ipcRenderer.on('updateCheck', () => {
      this.setStatus('checking');
    });

    ipcRenderer.on('updateAlert', () => {
      this.setStatus('pendingRestart');
    });

    ipcRenderer.on('updateUpToDate', () => {
      this.setStatus('uptodate');
    });

    ipcRenderer.on('updateAvailable', () => {
      this.setStatus('downloading');
    });
  },
  /**
   * Forces a check for updates.
   */
  check() {
    ipcRenderer.send('checkForUpdates');
  }
}

const updaterPlugin = {
  /**
   * Get ready the updater plugin for the app
   * @param {Object} Vue A Vue instance
   */
  install(Vue) {
    Vue.prototype.$initUpdater = updaterController.init.bind(updaterController);
    Vue.prototype.$checkForUpdates = updaterController.check;
  }
}

export default updaterPlugin;
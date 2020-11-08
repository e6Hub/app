import { ipcRenderer } from 'electron';
import store from '../store';

const updaterController = {
  // Misc
  /**
   * Print something with the "Updater" label.
   * @param {String} s The text to print
   */
  l(s) {
    console.log(`%c[Updater]%c ${s}`, 'color: #0AF;', '')
  },
  /**
   * Print something with the "Updater" label, but
   * in this function the label is red. Use this
   * if you want to show an error.
   * @param {String} s The text to print
   */
  e(s) {
    console.log(`$c[Updater]$c ${s}`, 'color: #F00;', '')
  },
  // Setters
  /**
   * Sets the status for the current update.
   * @param {String} v The status string.
   */
  setStatus(v) {
    store.dispatch('setUpdateStatus', v);
  },
  // Main methods
  /**
   * Init the updater controller and defines
   * the events with ipcRenderer.
   */
  init() {
    if (process.env.NODE_ENV !== 'production') {
      this.l('Development build');
      this.setStatus('dev');
    }

    ipcRenderer.on('updateCheck', (e) => {
      this.setStatus('checking');
    });

    ipcRenderer.on('updateAlert', (e) => {
      this.setStatus('pendingRestart');
    });

    ipcRenderer.on('updateUpToDate', (e) => {
      this.setStatus('uptodate');
    });

    ipcRenderer.on('updateAvailable', (e, ver) => {
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
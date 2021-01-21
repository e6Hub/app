const platformController = {
  /**
   * Returns the platform codename which the app is running on.
   */
  getPlatformName() {
    return process.platform;
  },
  /**
   * Returns true if the app is running on Microsoft Windows
   */
  isWindows() {
    return process.platform === 'win32';
  },
  /**
   * Returns true if the app is running on GNU/Linux
   */
  isLinux() {
    return process.platform === 'linux';
  }
}

const platformPlugin = {
  /**
   * Get ready the platform plugin for the app
   * @param {Object} Vue A Vue instance
   */
  install(Vue) {
    Vue.prototype.$platformName = platformController.getPlatformName();
    Vue.prototype.$isWindows = platformController.isWindows();
    Vue.prototype.$isLinux = platformController.isLinux();
  }
}

export default platformPlugin;
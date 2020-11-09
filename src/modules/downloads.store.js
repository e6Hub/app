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
    downloads: {}
  }
}
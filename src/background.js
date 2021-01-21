import { app, protocol, BrowserWindow, ipcMain, Menu } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { autoUpdater as updater } from 'electron-updater';
import fs from 'fs';
import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';
Menu.setApplicationMenu(null);

/**
 * Register a protocol for the app.
 */
protocol.registerSchemesAsPrivileged([{
  scheme: 'app', privileges: { standard: true, secure: true }
}]);

let win;

/**
 * Emit events to app webContents on updates events,
 * don't confuse this with Vue's events.
 */
updater.on('checking-for-update', () => win.webContents.send('updateCheck'));
updater.on('update-available', () => win.webContents.send('updateAvailable'));
updater.on('download-progress', (p) => win.webContents.send('updateProgress', p));
updater.on('update-not-available', () => win.webContents.send('updateUpToDate'));
updater.on('update-downloaded', (info) => win.webContents.send('updateAlert', info));

ipcMain.on('restartForUpdate', () => updater.quitAndInstall(true, true));
ipcMain.on('checkForUpdates', () => updater.checkForUpdates());

/**
 * Add Flash player in case the platform is Windows
 * and the target path exists. For now it's experimental
 * and can change in any moment.
 * 
 * https://www.adobe.com/products/flashplayer/end-of-life.html
 */
if (process.platform === 'win32' && fs.existsSync('C:\\Windows\\System32\\Macromed\\Flash\\')) app.commandLine.appendSwitch(
  'ppapi-flash-path',
  `C:\\Windows\\System32\\Macromed\\Flash\\${fs.readdirSync('C:\\Windows\\System32\\Macromed\\Flash\\').filter(f => f.startsWith('pepflashplayer64'))[0]}`
);

/**
 * Open links with HTTP(S) or FTP protocol on your default browser
 * based in your OS.
 */
function handleExterns(e, url) {
  if (!url) return;
  if (url.match(/^(http|ftp)s?:\/\/(?!localhost)/)) {
    e.preventDefault()
    require('electron').shell.openExternal(url);
  }
}

/**
 * Launch the electron app, it'll open the dev tools window if
 * the app is running under development enviroment.
 */
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      plugins: true
    },
    minWidth: 1024,
    minHeight: 600,
    width: 1024,
    height: 600,
    frame: process.platform === 'win32' ? false : true,
    icon: path.join(__static, 'icon.png')
  });

  if (isDev) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
    if (process.platform === 'win32') win.setIcon('e6hub.ico');
  } else {
    createProtocol('app');
    win.loadURL('app://./index.html/');
  }

  win.webContents.on('will-navigate', handleExterns);
  win.webContents.on('new-window', handleExterns);

  const supportedPlatforms = ['win32', 'linux'];
  if (supportedPlatforms.indexOf(process.platform) >= 0) updater.checkForUpdates();

  /**
   * Set the win variable to null
   * when all windows are closed.
   */
  win.on('closed', () => {
    win = null
  });
});
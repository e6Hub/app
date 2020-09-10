'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { autoUpdater as updater } from 'electron-updater';
import fs from 'fs';

const isDev = process.env.NODE_ENV !== 'production';
protocol.registerSchemesAsPrivileged([{
    scheme: 'app', privileges: {standard: true, secure: true}
}]);

let win;

// Updater

updater.on('checking-for-update', () => {
    win.webContents.send('updateCheck');
});

updater.on('update-available', () => {
    win.webContents.send('updateAvailable');
});

updater.on('download-progress', (p) => {
    win.webContents.send('updateProgress', p);
})

updater.on('update-not-available', () => {
    win.webContents.send('updateUpToDate');
});

updater.on('update-downloaded', (info) => {
    win.webContents.send('updateAlert', info.version);
});

ipcMain.on('restartForUpdate', (event) => {
    updater.quitAndInstall(true, true);
});

ipcMain.on('checkForUpdates', (event) => {
    updater.checkForUpdates();
});

if (process.platform === 'win32') app.commandLine.appendSwitch(
    'ppapi-flash-path',
    `C:\\Windows\\System32\\Macromed\\Flash\\${fs.readdirSync('C:\\Windows\\System32\\Macromed\\Flash\\').filter(f => f.startsWith('pepflashplayer64'))[0]}`
);

app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            plugins: true
        },
        minWidth: 1024,
        minHeight: 600,
        width: 1024,
        height: 600,
        frame: false
    });

    if (isDev) {
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        win.loadURL('app://./index.html/')
    }

    updater.checkForUpdates();

    win.on('closed', () => {
        win = null
    });
});
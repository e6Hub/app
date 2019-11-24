'use strict';

import { app, protocol, BrowserWindow } from "electron"
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

const isDev = process.env.NODE_ENV !== 'production';
protocol.registerSchemesAsPrivileged([{
    scheme: 'app', privileges: {standard: true, secure: true}
}]);

app.on('ready', async () => {
    await installVueDevtools();

    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
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

    win.on('closed', () => {
        win = null
    });
});


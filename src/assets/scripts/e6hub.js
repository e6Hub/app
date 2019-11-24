const { BrowserWindow } = require('electron').remote

class Main {
    constructor() {
        this.window = BrowserWindow.getAllWindows()[0];
    }

    onload() {
        let selfWin = this.window;
        
        document.querySelector('#close-app').onclick = () => {
            selfWin.close();
        };

        document.querySelector('#maximize-app').onclick = () => {
            selfWin.isMaximized()
            ? selfWin.restore()
            : selfWin.maximize();
        };

        document.querySelector('#minimize-app').onclick = () => {
            selfWin.minimize();
        }
    }
}

export default new Main();
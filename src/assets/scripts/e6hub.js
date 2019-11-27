const { BrowserWindow } = require('electron').remote

class Main {
    constructor() {
        this.window = BrowserWindow.getAllWindows()[0];
    }

    onload() {
        let selfWin = this.window;
        
        document.getElementById('close-app').onclick = () => {
            selfWin.close();
        };

        document.getElementById('maximize-app').onclick = () => {
            selfWin.isMaximized()
            ? selfWin.restore()
            : selfWin.maximize();
        };

        document.getElementById('minimize-app').onclick = () => {
            selfWin.minimize();
        }

        if (!JSON.parse(localStorage.settings)) {
            let newSettings = {
                rpc: {
                    enabled: false,
                    showShowing: false,
                    showWatching: false
                },
                downloadLocation: require('os').userInfo().homedir
            }
        }
    }
}

export default new Main();
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

        if (!localStorage.settings) {
            localStorage.settings = JSON.stringify({
                rpc: {
                    enabled: false,
                    showShowing: false,
                    showWatching: false
                },
                downloadLocation: require('os').userInfo().homedir
            });
        }

        Array.prototype.so = function(cb) {
            return new Promise((res, rej) => {
                try {
                    let c = 0;
                    for (;c<this.length;) {
                        cb(this[c]);
                        if (c == this.length - 1) return res();
                        ++c;
                    }
                } catch (e) {
                    return rej(e);
                }
            })
        }
    }
}

export default new Main();
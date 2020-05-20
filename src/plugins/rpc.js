import { ipcRenderer } from 'electron';
import store from '../store';

const rpcController = {
    // Misc
    /**
     * Print something with the "RPC" label.
     * @param {String} s The text to print
     */
    l(s) {
        console.log(`%c[RPC]%c ${s}`, 'color: #5AF;', '')
    },
    /**
     * Print something with the "RPC" label, but
     * in this function the label is red. Use this
     * if you want to show an error.
     * @param {String} s The text to print
     */
    e(s) {
        console.log(`%c[RPC]%c ${s}`, 'color: #F77;', '')
    },
    // Getters
    /**
     * Finds a setting value by a keyname.
     * @param {String} kN The name of the key
     */
    setting(kN) {
        return this.settings[kN];
    },
    /**
     * Returns all the app's settings.
     */
    settings: store.getters.settings,
    /**
     * Returns the RPC object stored in Vuex.
     */
    rpc: store.getters.rpc,
    // Setters
    set(propName, value, emit = false) {
        let validProps = ['conn', 'type', 'tags', 'postId'];
        if (validProps.indexOf(propName) < 0) return this.e(`Prop <${propName}> don't exists!`);
        if (value === undefined) return this.e(`But the value don't exists!`);
        store.dispatch(`setRPC${propName}`, value);
        if (emit) this.change();
    },
    // Main methods
    /**
     * Sends a ipc event to the background process for
     * connect Discord RPC.
     */
    connect() {
        this.l('Connecting');
        ipcRenderer.send('connectDiscordRPC');
    },
    /**
     * Refresh the status of RPC.
     */
    refresh() {
        this.l('Updated');
        ipcRenderer.send('RPC_settingsChanged', this.setting('rpcEnabled'));
        if (this.setting('rpcEnabled')) this.change();
    },
    /**
     * Run this function if there was a change in the RPC settings,
     * for toggle use refresh().
     */
    change() {
        this.l('Changed');
        let _tags = store.getters.tags,
            _postId = store.getters.postId,
            _rpc = this.rpc;

        if (_tags) {
            if (this.setting('rpcShowSearching')) this.set('tags', _tags);
            else this.set('tags', 'Something');
        } else this.set('tags', 'Anything');

        if (_rpc.type == 'WATCHING' && !this.setting('rpcShowWatching')) return;

        if (_postId && this.setting('rpcShowWatching')) this.set('postId', _postId);
        else this.set('postId', null);

        if (!this.setting('rpcEnabled')) return;

        let rpcToSet = {
            type: this.rpc.type,
            tags: this.rpc.tags,
            postid: this.rpc.postId
        }

        ipcRenderer.send('RPC_status', rpcToSet);
    },
    /**
     * Init the Discord RPC controller and
     * defines the events with ipcRenderer.
     */
    init() {
        this.l('Initializing');

        ipcRenderer.on('RPC_connected', (event, err) => {
            this.set('conn', true);
            this.l('Connected');
            ipcRenderer.send('RPC_ready', this.settings)
        });

        ipcRenderer.on('RPC_error', (event, err) => {
            this.set('conn', false);
            this.e(err);
        });

        // Emit ready to RPC
        if (this.setting('rpcEnabled')) {
            this.connect();
        }
    }
}

const rpcPlugin = {
    /**
     * Get ready the Discord RPC plugin for the app
     * @param {Object} Vue A Vue instance
     */
    install(Vue) {
        Vue.prototype.$initRPC = rpcController.init.bind(rpcController);
        Vue.prototype.$setRPC = rpcController.set.bind(rpcController);
        Vue.prototype.$connectRPC = rpcController.connect.bind(rpcController);
        Vue.prototype.$refreshRPC = rpcController.refresh.bind(rpcController);
    }
}

export default rpcPlugin;
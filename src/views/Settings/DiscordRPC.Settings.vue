<template>
    <div id="rpc-settings">
        <h3 class="text-2xl font-bold uppercase text-gray-500 mb-4">Discord RPC</h3>
        <label class="flex checkbox-label my-2">
            <div class="bg-gray-600 rounded shadow w-6 h-6 p-1 flex justify-center items-center mr-4">
                <input type="checkbox" class="hidden" v-model="enabledComp">
                <svg class="hidden w-4 h-4 text-indigo-200 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
            </div>
            <span class="select-none">Enable Discord RPC</span>
        </label>
        <h4 class="text-sm font-bold uppercase text-gray-600">RPC Settings</h4>
        <label class="flex checkbox-label my-2">
            <div class="bg-gray-600 rounded shadow w-6 h-6 p-1 flex justify-center items-center mr-4">
                <input id="showSearching" type="checkbox" class="hidden" v-model="showSearchingComp">
                <svg class="hidden w-4 h-4 text-indigo-200 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
            </div>
            <span class="select-none">Show what i'm searching</span>
        </label>
        <label class="flex checkbox-label my-2">
            <div class="bg-gray-600 rounded shadow w-6 h-6 p-1 flex justify-center items-center mr-4">
                <input id="showSearching" type="checkbox" class="hidden" v-model="showWatchingComp">
                <svg class="hidden w-4 h-4 text-indigo-200 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
            </div>
            <span class="select-none">Show what i'm watching</span>
        </label>
        <div id="rpc-status">
            <h4 class="text-sm font-bold uppercase text-gray-600">RPC Status</h4>
            <div v-if="connectedComp">Connected</div>
            <div v-else>
                <span class="mr-4">Disconnected</span>
                <button class="mt-4 bg-indigo-400 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200" @click="reconnectRPC">Reconnect</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'RPCSettings',
    data() {
        return {
            enabled: false
        }
    },
    computed: {
        ...mapGetters(['setting', 'rpc']),
        enabledComp: {
            get() {
                return this.setting('rpcEnabled');
            },
            set(val) {
                this.RPC('Enabled', val);
            }
        },
        showSearchingComp: {
            get() {
                return this.setting('rpcShowSearching');
            },
            set(val) {
                this.RPC('ShowSearching', val);
            }
        },
        showWatchingComp: {
            get() {
                return this.setting('rpcShowWatching');
            },
            set(val) {
                this.RPC('ShowWatching', val);
            }
        },
        connectedComp() {
            return this.rpc.connected;
        }
    },
    methods: {
        ...mapActions(['setSetting']),
        RPC(k, value) {
            this.setSetting({key: `rpc${k}`, value});
            this.$refreshRPC();
        },
        reconnectRPC() {
            this.$connectRPC();
        }
    }
}
</script>
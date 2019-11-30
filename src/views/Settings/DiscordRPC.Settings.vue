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
    </div>
</template>

<script>
export default {
    name: 'RPCSettings',
    data() {
        return {
            enabled: false
        }
    },
    computed: {
        enabledComp: {
            get() {
                return JSON.parse(localStorage.settings).rpc.enabled;
            },
            set(val) {
                this.RPC('enabled', val);
                this.$data.enabled = val;
            }
        },
        showSearchingComp: {
            get() {
                return JSON.parse(localStorage.settings).rpc.showSearching;
            },
            set(val) {
                this.RPC('showSearching', val);
            }
        },
        showWatchingComp: {
            get() {
                return JSON.parse(localStorage.settings).rpc.showWatching;
            },
            set(val) {
                this.RPC('showWatching', val);
            }
        }
    },
    methods: {
        RPC(k, v) {
            // Check if settings exists
            if (localStorage.settings) {
                let settingsObj = JSON.parse(localStorage.settings); // Parses the localStorage
                if (!settingsObj.rpc) settingsObj.rpc = {[k]: v} // it's ...['rpc'] defined?
                else settingsObj.rpc[k] = v; // set value if it's defined
                localStorage.settings = JSON.stringify(settingsObj); // and string the object for change the settings
            } else {
                localStorage.settings = JSON.stringify({rpc: { [k]: v }});
            }

            this.$events.$emit('updated-rpc', JSON.parse(localStorage.settings).rpc);
        }
    }
}
</script>
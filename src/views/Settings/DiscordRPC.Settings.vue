<template>
    <SettingView id="rpc-settings" title="Discord RPC">
        <Checkbox :evar="enabledComp" name="Enabled" :onChange="this.RPC">Enable Discord RPC</Checkbox>
        <h4 class="text-sm font-bold uppercase text-gray-600">RPC Settings</h4>
        <Checkbox :evar="showSearchingComp" name="ShowSearching" :onChange="this.RPC">Show what i'm searching</Checkbox>
        <Checkbox :evar="showWatchingComp" name="ShowWatching" :onChange="this.RPC">Show what i'm watching</Checkbox>
        <div id="rpc-status">
            <h4 class="text-sm font-bold uppercase text-gray-600">RPC Status</h4>
            <div v-if="connectedComp">Connected</div>
            <div v-else>
                <span class="mr-4">Disconnected</span>
                <button class="mt-4 bg-indigo-400 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200" @click="reconnectRPC">Reconnect</button>
            </div>
        </div>
    </SettingView>
</template>

<script>
import SettingView from '@/components/SettingView.vue'
import Checkbox from '@/components/Checkbox.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'RPCSettings',
    components: { SettingView, Checkbox },
    data() {
        return {
            enabled: false
        }
    },
    computed: {
        ...mapGetters(['setting', 'rpc']),
        enabledComp() {
            return this.setting('rpcEnabled');
        },
        showSearchingComp() {
            return this.setting('rpcShowSearching');
        },
        showWatchingComp() {
            return this.setting('rpcShowWatching');
        },
        connectedComp() {
            return this.rpc.connected;
        }
    },
    methods: {
        ...mapActions(['setSetting']),
        RPC(e) {
            this.setSetting({key: `rpc${e.target.name}`, value: e.target.checked});
            this.$refreshRPC();
        },
        reconnectRPC() {
            this.$connectRPC();
        }
    }
}
</script>
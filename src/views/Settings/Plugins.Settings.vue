<template>
    <SettingView id="plugins-settings" title="Plugins">
        <div id="plugins-header">
            <button @click="openFolder"  class="mt-4 ml-4 bg-indigo-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Open plugins folder</button>
            <button @click="refreshPlugins" class="mt-4 ml-4 bg-orange-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Refresh plugins</button>
        </div>
        <ul id="plugins-list">
            <li v-for="(plg, index) in this.plugins" v-bind:key="index">
                <div id="plg-header">
                    <span id="plg-name" v-text="plg.meta.name"/>
                    <span id="plg-by">by</span>
                    <span id="plg-author" v-text="plg.meta.author"/>
                </div>
                <div id="plg-actions">
                    <button v-if="!plg.enabled" @click="enablePlugin(plg.path)" class="mt-4 ml-4 bg-green-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Enable</button>
                    <button v-else @click="disablePlugin(plg.path)" class="mt-4 ml-4 bg-indigo-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Disable</button>
                    <button @click="removePlugin(plg)" class="mt-4 ml-4 bg-red-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Remove</button>
                </div>
            </li>
        </ul>
    </SettingView>
</template>

<script>
import SettingView from '@/components/SettingView.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'PluginsSettings',
    components: { SettingView },
    computed: {
        ...mapGetters(['pluginsDir', 'plugins']),
    },
    methods: {
        openFolder() {
            const { shell } = require('electron');
            shell.openItem(this.pluginsDir);
        },
        refreshPlugins() {
            console.log('refreshing plugins...');
            this.$refreshPlugins();
        },
        enablePlugin(plgPath) {
            this.$loadPlugin(plgPath);
        },
        disablePlugin(plgPath) {
            this.$unloadPlugin(plgPath);
        },
        removePlugin(plg) {
            this.$removePlugin(plg);
        }
    }
}
</script>
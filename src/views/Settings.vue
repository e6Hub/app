<template>
    <div id="settings-container" class="inline-block w-full p-6">
        <h2 class="text-2xl font-bold uppercase text-gray-600">Settings</h2>
        <RPCSettings/>
        <div id="app-version">
            <h3 class="text-base font-bold uppercase text-gray-500">App version</h3>
            <p>{{require('../../package.json').version}}</p>
        </div>
    </div>
</template>

<script>
import RPCSettings from './Settings/DiscordRPC.Settings.vue';

export default {
    name: 'settings',
    components: {
        RPCSettings
    }
}
</script>
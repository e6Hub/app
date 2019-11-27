<template>
    <div id="settings-container" class="inline-block w-full p-6">
        <h2 class="text-2xl font-bold uppercase text-gray-600">Settings</h2>
        <DownloadSettings/>
        <RPCSettings/>
        <AppVersionSeetings/>
    </div>
</template>

<script>
import DownloadSettings from './Settings/Downloads.Settings.vue';
import RPCSettings from './Settings/DiscordRPC.Settings.vue';
import AppVersionSeetings from './Settings/AppVersion.Settings.vue';

export default {
    name: 'settings',
    components: {
        RPCSettings,
        DownloadSettings,
        AppVersionSeetings
    }
}
</script>
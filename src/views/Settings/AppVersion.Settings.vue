<template>
    <div id="app-version">
        <h3 class="text-base font-bold uppercase text-gray-500">App version</h3>
        <p>{{require('../../../package.json').version}} :: {{this.$parent.$parent.updateState}}</p>
        <button v-if="this.$parent.$parent.updateState == 'pendingRestart'" @click="restartForUpdate" class="mt-4 bg-green-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl transition-100">Restart to update</button>
        <button v-else-if="this.$parent.$parent.updateState == 'downloading'" class="mt-4 bg-indigo-400 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl transition-100">Downloading</button>
        <button v-else-if="this.$parent.$parent.updateState == 'uptodate'" class="mt-4 bg-indigo-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl transition-100">Check for updates</button>
        <button v-else-if="this.$parent.$parent.updateState == 'checking'" class="mt-4 bg-gray-600 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl transition-100">Checking update...</button>
        <button v-else-if="this.$parent.$parent.updateState == 'dev'" class="mt-4 bg-gray-700 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl transition-100">Development build</button>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
    name: 'AppVersionSettings',
    methods: {
        restartForUpdate() {
            ipcRenderer.send('restartForUpdate');
        }
    }
}
</script>
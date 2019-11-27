<template>
    <div id="app-version">
        <h3 class="text-base font-bold uppercase text-gray-500">App version</h3>
        <p>{{require('../../../package.json').version}}</p>
        <button v-if="this.$parent.pendingUpdate" @click="restartForUpdate" class="mt-4 bg-green-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl transition-100">Restart to update</button>
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
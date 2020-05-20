<template>
    <div id="app-about">
        <h3 class="text-2xl font-bold uppercase text-gray-500 mb-4">About</h3>
        <div id="notice" class="bg-gray-700 px-4 py-2 mb-4 rounded shadow">
            <h4 class="text-xl text-gray-500 mb-2">e6Hub isn't an official app of e621.net</h4>
            <p>This app was created by users, not the e621's staff. If you want to report bug
                or make a suggestion go to <a class="text-indigo-300" href="https://github.com/e6Hub/app/issues" @click="openExternal">Issues</a>.
                This app doesn't provide any warranty. In fact, it's open source. The author of the project
                is <a class="text-indigo-300" href="https://e621.net/user/show/418103" @click="openExternal">AerysSaektide</a>
                and it's licensed under <a class="text-indigo-300" href="https://raw.githubusercontent.com/e6Hub/app/master/LICENSE" @click="openExternal">MIT license</a>.
            </p>
        </div>
        <p>{{require('../../../package.json').version}}</p>

        <button v-if="updateStatus == 'pendingRestart'" @click="restartForUpdate" class="mt-4 bg-green-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Restart to update</button>
        <button v-else-if="updateStatus == 'downloading'" class="mt-4 bg-indigo-400 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Downloading</button>
        <button v-else-if="updateStatus == 'uptodate'" @click="checkForUpdate" class="mt-4 bg-indigo-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Check for updates</button>
        <button v-else-if="updateStatus == 'checking'" class="mt-4 bg-gray-600 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Checking update...</button>
        <button v-else-if="updateStatus == 'dev'" class="mt-4 bg-gray-700 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Development build</button>
        
        <button @click="resetSettings" class="mt-4 ml-4 bg-orange-500 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Reset settings</button>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AboutSettings',
    computed: {
        ...mapGetters(['updateStatus'])
    },
    methods: {
        ...mapActions(['resetSettings']),
        restartForUpdate() {
            ipcRenderer.send('restartForUpdate');
        },
        checkForUpdate() {
            ipcRenderer.send('checkForUpdates');
        },
        openExternal(e) {
            e.preventDefault();
            require("electron").shell.openExternal(e.target.getAttribute('href'));
        }
    }
}
</script>
<template>
    <div id="downloads-settings">
        <h3 class="text-2xl font-bold uppercase text-gray-500 mb-4">Downloads</h3>
        <h4 class="text-sm font-bold uppercase text-gray-600">Current downloads folder</h4>
        <button id="selectDownloadLocation" @click="manageFolder" class="bg-indigo-400 py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200">Manage folder</button>
        <p id="downloadLocation" name="downloadLocation" v-text="downloadFolder" class="inline-block bg-gray-900 py-2 px-4 rounded my-4 ml-4"></p>
    </div>
</template>

<script>
const { dialog } = require('electron').remote;

export default {
    name: 'DownloadsSettings',
    data() {
        return {
            downloadFolder: JSON.parse(localStorage.settings).downloadLocation
        }
    },
    methods: {
        manageFolder() {
            dialog.showOpenDialog({
                properties: ['openDirectory']
            })
            .then((d) => {
                if (d.canceled || !d.filePaths[0]) return;

                let settingsObj = JSON.parse(localStorage.settings);
                settingsObj.downloadLocation = d.filePaths[0];
                localStorage.settings = JSON.stringify(settingsObj);
                this.downloadFolder = d.filePaths[0];
            })
            .catch(console.warn);
        }
    }
}
</script>
<template>
    <div id="titlebar" class="w-full bg-gray-900 h-8 text-right text-white">
        <div id="window-buttons" class="inline-block">
            <button id="minimize-app" class="focus:outline-none hover:bg-gray-700 cursor-default">
                <img :src="MinIcon" width="10"/>
            </button>
            <button id="restore-app" class="focus:outline-none hover:bg-gray-700 cursor-default" v-if="isMaximized">
                <img :src="RestoreIcon" width="10"/>
            </button>
            <button id="maximize-app" class="focus:outline-none hover:bg-gray-700 cursor-default" v-else>
                <img :src="MaxIcon" width="10"/>
            </button>
            <button id="close-app" class="focus:outline-none hover:bg-red-600 hover:text-white cursor-default">
                <img :src="CloseIcon" width="10"/>
            </button>
        </div>
    </div>
</template>

<script>
import CloseIcon from '@/assets/titlebar/c.png'
import MaxIcon from '@/assets/titlebar/m.png'
import RestoreIcon from '@/assets/titlebar/r.png'
import MinIcon from '@/assets/titlebar/n.png'

export default {
    name: 'Titlebar',
    data() {
        return {
            MinIcon,
            RestoreIcon,
            MaxIcon,
            CloseIcon,
            isMaximized: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            const { BrowserWindow } = require('electron').remote,
            selfWin = BrowserWindow.getAllWindows()[0];

            this.isMaximized = selfWin.isMaximized();

            selfWin.on('unmaximize', () => { this.isMaximized = false });
            selfWin.on('maximize', () => { this.isMaximized = true });

            document.getElementById('close-app').onclick = () => {
                selfWin.close();
            };

            document.getElementById('maximize-app').onclick = () => {
                selfWin.isMaximized()
                ? selfWin.restore()
                : selfWin.maximize();
            };

            document.getElementById('minimize-app').onclick = () => {
                selfWin.minimize();
            }
        })
    }
}
</script>
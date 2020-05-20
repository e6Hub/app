<template>
    <div id="titlebar" v-bind:class="getMainClass()">
        <div id="window-buttons" class="inline-block">
            <button id="minimize-app" v-bind:class="getBtnClass('min')">
                <img :src="MinIcon" width="10"/>
            </button>
            <button id="restore-app" v-bind:class="getBtnClass('res')" v-if="isMaximized">
                <img :src="RestoreIcon" width="10"/>
            </button>
            <button id="maximize-app" v-bind:class="getBtnClass('min')" v-else>
                <img :src="MaxIcon" width="10"/>
            </button>
            <button id="close-app" v-bind:class="getBtnClass('close')">
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
import { mapGetters } from 'vuex';

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
    computed: {
        ...mapGetters(['setting'])
    },
    methods: {
        getMainClass() {
            switch (this.setting('titlebarStyle')) {
                case 'win10':
                    return 'bg-gray-900 h-8 text-right';
                    break;
                case 'small':
                    return 'bg-gray-900 h-6 text-right';
                    break;
            }
        },
        getBtnClass(typeButton) {
            switch (typeButton) {
                case 'close':
                    switch (this.setting('titlebarStyle')) {
                        case 'win10':
                            return 'focus:outline-none hover:bg-red-600 hover:text-white cursor-default h-8 w-12';
                            break;
                        case 'small':
                            return 'focus:outline-none hover:bg-red-600 hover:text-white cursor-default h-6 w-8';
                            break;
                    }
                break;
                default:
                    switch (this.setting('titlebarStyle')) {
                        case 'win10':
                            return 'focus:outline-none hover:bg-gray-700 cursor-default h-8 w-12';
                            break;
                        case 'small':
                            return 'focus:outline-none hover:bg-gray-700 cursor-default h-6 w-8';
                            break;
                    }
                break;
            }
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
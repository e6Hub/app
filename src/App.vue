<template>
    <div id="main" class="bg-gray-800 inset-0 absolute">
        <Titlebar />
        <div id="app-container" class="absolute flex inset-0 mt-6 text-white pl-16">
            <Sidebar ref="sidebar" />
            <transition name="fade" mode="out-in">
                <keep-alive exclude="postView">
                    <router-view/>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Titlebar from '@/components/Titlebar.vue';
import Main from '@/assets/scripts/e6hub.js';
import * as d from 'request-progress';
import * as r from 'request';
import fs from 'fs';
import { ipcRenderer } from 'electron';

export default {
    name: 'App',
    data() {
        return {
            downloadsQueue: [],
            downloaded: [],
            tags: null,
            state: null,
            rpc: {
                connected: false,
                type: 'IDLE',
                tags: null
            },
            updateState: null,
            postsList: []
        }
    },
    components: {
        Sidebar,
        Titlebar
    },
    watch: {
        $route(to, from) {
            if (from.name == 'postView') {
                this.postid = null;
                this.$events.$emit('state-changed-rpc', {type: 'SEARCHING'});
            }

            if (to.name == 'postView') {
                this.postid = to.params.id;
                this.$events.$emit('state-changed-rpc', {type: 'WATCHING'});
            }
        }
    },
    methods: {
        addDownloadPost(postData) {
            if (this.downloadsQueue.findIndex(post_id => post_id.id == postData.id) > -1) {
                console.warn('You are downloading this file right now!')
                return;
            }

            if (this.downloaded.findIndex(post_id => post_id.id == postData.id) > -1) {
                console.warn('You has already downloaded this file!')
                return;
            }

            this.$set(postData, 'download', {});
            this.$set(postData.download, 'state', 'downloading');
            this.$set(postData.download, 'progress', 0);

            this.downloadsQueue.push(postData);
            this.$events.$emit('downloadpost', postData);
        }
    },
    mounted: function() {
        let self = this;
        this.$nextTick(function () {
            Main.onload();

            if (process.env.NODE_ENV !== 'production') {
                console.log(`dev build detected`);
                self.updateState = 'dev';
            }

            ipcRenderer.on('updateCheck', function(event) {
                self.updateState = 'checking';
            });

            ipcRenderer.on('updateAlert', function(event) {
                self.updateState = 'pendingRestart';
            });

            ipcRenderer.on('updateUpToDate', function(event) {
                self.updateState = 'uptodate';
            });

            ipcRenderer.on('updateAvailable', function(event, ver) {
                self.updateState = 'downloading';
            });

            ipcRenderer.on('updateProgress', function(event, progress) {
                self.updateState = 'downloading';
                console.log(progress);
            });

            // RPC background events
            ipcRenderer.on('RPC_connected', function(event, err) {
                self.rpc.connected = true;
                ipcRenderer.send('RPC_ready', JSON.parse(localStorage.settings).rpc)
            });

            ipcRenderer.on('RPC_error', function(event, err) {
                console.error(err);
                self.rpc.connected = false;
            });

            // Define keybinds
            document.body.addEventListener('keydown', function (e) {
                let key = e.keyCode
                switch (key) {
                    case 27: // Escape
                        switch (self.$route.name) {
                            case 'search':
                                if (self.$route.matched[0].instances.default.posts.length) {
                                    self.$route.matched[0].instances.default.posts = [];
                                    self.tags = null;
                                    self.$events.$emit('state-changed-rpc', {type: 'IDLE'});
                                }
                            break;
                            case 'postView':
                                self.$router.push({name: 'search'});
                            break;
                        }
                    break;
                    case 13: // Enter
                        if (self.$route.name == 'postView') {
                            self.addDownloadPost(self.$route.params.post);
                        }
                    break;
                }
            });

            self.$events.$on('downloadpost', function(p) {
                let indx;

                d(
                    r(p.file_url), {
                        throttle: 250
                    }
                )
                .on('progress', st => {
                    indx = self.downloadsQueue.findIndex(idPost => idPost.id == p.id);
                    let percent = Math.round(st.percent * 100);
                    self.$set(self.downloadsQueue[indx].download, 'progress', percent)
                })
                .on('error', err => {
                    indx = self.downloadsQueue.findIndex(idPost => idPost.id == p.id);
                    self.downloadsQueue[indx].download.state = 'error';
                    console.error(`Failed to download ${p.id} :: ${err}`);
                })
                .on('end', () => {
                    indx = self.downloadsQueue.findIndex(idPost => idPost.id == p.id);
                    self.downloadsQueue[indx].download.state = 'downloaded';
                    self.downloaded.push(self.downloadsQueue[indx]);
                    self.downloadsQueue.splice(indx, 1);
                })
                .pipe(fs.createWriteStream(`${JSON.parse(localStorage.settings).downloadLocation}/${p.id}.${p.file_ext}`));
            });

            self.$events.$on('reconnect-rpc', function() {
                ipcRenderer.send('connectDiscordRPC');
            });

            self.$events.$on('updated-rpc', function(rpcObj) {
                ipcRenderer.send('RPC_settingsChanged', rpcObj, self.rpc);
                if (rpcObj.enabled) self.$events.$emit('state-changed-rpc', {type: self.rpc.type});
            });

            self.$events.$on('state-changed-rpc', function(st) {
                self.rpc.type = st.type;

                if (self.tags) {
                    if (JSON.parse(localStorage.settings).rpc.showSearching) self.rpc.tags = self.tags;
                    else self.rpc.tags = 'Something';
                } else self.rpc.tags = null;

                if (st.type == 'WATCHING' && !JSON.parse(localStorage.settings).rpc.showWatching) return;

                if (self.postid && JSON.parse(localStorage.settings).rpc.showWatching) self.rpc.postid = self.postid;
                else self.rpc.postid = null;

                if (!JSON.parse(localStorage.settings).rpc.enabled) return;
                ipcRenderer.send('RPC_status', self.rpc);
            });

            // Emit ready to RPC
            if (JSON.parse(localStorage.settings).rpc.enabled) {
                this.$events.$emit('reconnect-rpc');
            }
        });
    }
}
</script>

<style src="./assets/app.css"/>
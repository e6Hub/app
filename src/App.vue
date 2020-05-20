<template>
    <div id="main" class="bg-gray-800 inset-0 absolute">
        <Titlebar />
        <div id="app-container" class="absolute flex inset-0 text-white pl-16 duration-200"
        v-bind:class="{
            'mt-6': this.setting('titlebarStyle') === 'small' || this.setting('titlebarStyle') === 'macos',
            'mt-8': this.setting('titlebarStyle') === 'win10',
        }">
            <Sidebar ref="sidebar" />
            <transition name="fade" mode="out-in">
                <keep-alive :exclude="['postView', 'settings']">
                    <router-view/>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Titlebar from '@/components/Titlebar.vue';
import * as d from 'request-progress';
import * as r from 'request';
import fs from 'fs';

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    data() {
        return {
            downloadsQueue: [],
            downloaded: [],
            updateState: null,
            postsList: []
        }
    },
    components: { Sidebar, Titlebar },
    watch: {
        $route(to, from) {
            if (from.name == 'postView') {
                this.setPostId(null);
                this.set('type', 'SEARCHING', true);
            }

            if (to.name == 'postView') {
                this.setPostId(to.params.id);
                this.set('type', 'WATCHING', true);
            }
        }
    },
    computed: {
        ...mapGetters(['setting'])
    },
    methods: {
        ...mapActions(['verifySettings', 'setPostId']),
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
        this.$nextTick(() => {
            this.verifySettings();
            this.$initUpdater();
            this.$initRPC();

            self.$events.$on('downloadpost', function(p) {
                let indx;
                console.log(p)
                d(
                    r(p.file.url), {
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
                .pipe(fs.createWriteStream(`${JSON.parse(localStorage.settings).downloadLocation}/${p.id}.${p.file.ext}`));
            });
        });
    }
}
</script>
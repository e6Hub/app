<template>
    <div id="main" class="bg-gray-800 inset-0 absolute">
        <Titlebar />
        <div id="app-container" class="absolute flex inset-0 mt-6 text-white">
            <Sidebar ref="sidebar" />
            <transition name="fade" mode="out-in">
                <keep-alive exclude="postView">
                    <router-view ref="routerView"/>
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

export default {
    name: 'App',
    data() {
        return {
            downloadsQueue: [],
            downloaded: []
        }
    },
    components: {
        Sidebar,
        Titlebar
    },
    watch: {
        $route (to, from) {
            
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
            
            document.body.addEventListener('keydown', function (e) {
                let key = e.keyCode
                switch (key) {
                    case 27: // Escape
                        switch (self.$route.name) {
                            case 'search':
                                self.$route.matched[0].instances.default.posts = [];
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
                let indx = self.downloadsQueue.findIndex(idPost => idPost.id == p.id);

                d(
                    r(p.file_url), {
                        throttle: 250
                    }
                )
                .on('progress', st => {
                    let percent = Math.round(st.percent * 100);

                    self.$set(self.downloadsQueue[indx].download, 'progress', percent)
                })
                .on('error', err => {
                    self.downloadsQueue[indx].download.state = 'error';
                    console.error(`Failed to download ${p.id} :: ${err}`);
                })
                .on('end', () => {
                    self.downloadsQueue[indx].download.state = 'downloaded';
                    self.downloaded.push(self.downloadsQueue[indx]);
                    self.downloadsQueue.splice(indx, 1);
                })
                .pipe(fs.createWriteStream(`${require('os').userInfo().homedir}/Documents/E6-Downloads/${p.id}.${p.file_ext}`));
            })
        });
    }
}

</script>

<style src="./assets/app.css"/>
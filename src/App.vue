<template>
  <div id="main" class="bg-dark-9 inset-0 absolute">
    <Titlebar />
    <div
      id="app-container"
      class="absolute flex inset-0 text-white pl-16 duration-200"
      :class="{
        'mt-6': this.setting('titlebarStyle') === 'small',
        'mt-8': this.setting('titlebarStyle') === 'win10'
      }"
    >
      <Sidebar ref="sidebar" />
      <transition name="fade" mode="out-in">
        <keep-alive :exclude="['postView', 'poolView', 'settings']">
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Titlebar from "@/components/Titlebar.vue";
import * as d from "request-progress";
import * as r from "request";
import fs from "fs";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: { Sidebar, Titlebar },
  watch: {
    $route(to, from) {
      if (from.name == "postView") {
        this.setPostId(0);
      }

      if (to.name == "postView") {
        this.setPostId(to.params.id);
      }
    },
  },
  computed: {
    ...mapGetters("settings", ["setting"]),
    ...mapGetters("downloads", ["lastTime", "queuePosts"]),
    downloadsDirectory() {
      return this.setting('downloadLocation');
    }
  },
  methods: {
    ...mapActions("settings", ["verifySettings"]),
    ...mapActions("posts", {setPostId: "setId"}),
    ...mapActions("downloads", ["updateLastTime", "updatePool", "updatePost"]),
    downloadPost(post, fn, subDir = null) {
      if (subDir) fs.mkdirSync(`${this.downloadsDirectory}/${subDir}`, {recursive: true});

      const url = post.file.url,
        id = post.id,
        ext = post.file.ext,
        d_ = () => {
          this.updateLastTime();

          d(r(url), {
            throttle: 250,
          })
            .on("progress", (status) => {
              let percent = Math.round(status.percent * 100);
              fn({type: 'progress', percent, url, id});
            })
            .on("error", (err) => {
              fn({type: 'error', err, url, id});
            })
            .on("end", () => {
              fn({type: 'end', url, id});
            })
            .pipe(
              fs.createWriteStream(
                `${this.downloadsDirectory}/${subDir ? `${subDir}/`: ''}${id}.${ext}`
              )
            );
      }

      const now = new Date().getTime(),
        lt = this.lastTime,
        toWait = lt + 3000;
      
      if (now < toWait) {
        const diff = toWait - now;
        setTimeout(d_, diff);
      } else d_();
    },
    downloadFirstPostPending() {
      const pending_ = this.queuePosts.filter(p => p.status === 'pending');
      const downloading_ = this.queuePosts.filter(p => p.status === 'downloading');
      
      if (!pending_.length) return;
      if (downloading_.length) return;
      let localPayload = pending_[0];

      localPayload.status = 'downloading';
      this.updatePost(localPayload);
      this.downloadPost(pending_[0], (status) => {
        switch (status.type) {
          case 'progress':
            localPayload.status = 'downloading';
            localPayload.progress = status.percent;
            this.updatePost(localPayload);
            break;
          case 'error':
            localPayload.status = 'error';
            this.updatePost(localPayload);
            throw status.err;
            break;
          case 'end':
            localPayload.status = 'done';
            localPayload.progress = 100;
            this.updatePost(localPayload);
            setTimeout(this.downloadFirstPostPending);
            break;
        }
      });
    }
  },
  mounted: function () {
    const each = async function(arr, cb) {
      for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
      }
    }

    let self = this;

    this.$nextTick(() => {
      this.verifySettings();
      this.$initUpdater();
      this.$initPluginMan();

      this.$store.subscribeAction(({type, payload}) => {
        switch (type) {
          case 'downloads/addQueuePool':
            if (!payload.posts.length) return;
            let localPayload = payload;
            each(payload.posts, (post_, postIndex_) => {
              return new Promise((res, rej) => {
                this.downloadPost(post_, (status) => {
                  switch (status.type) {
                    case 'progress':
                      localPayload.status = 'downloading';
                      this.updatePool(localPayload);
                      break;
                    case 'error':
                      rej(status.err);
                      break;
                    case 'end':
                      localPayload.progress = Math.round(((postIndex_ + 1) / payload.posts.length) * 100);
                      this.updatePool(localPayload);
                      res(status);
                      break;
                  }
                }, payload.name);
              })
            }).then(() => {
              localPayload.status = 'downloaded'
              this.updatePool(localPayload);
            }).catch((error) => {
              localPayload.status = 'error'
              this.updatePool(localPayload);
              throw error;
            });
            break;
          case 'downloads/addQueuePost':
            setTimeout(this.downloadFirstPostPending);
            break;
        }
      });
    });
  },
};
</script>
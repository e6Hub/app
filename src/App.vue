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
  data() {
    return {
      downloadsQueue: [],
      downloaded: [],
      updateState: null,
      postsList: [],
    };
  },
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
  },
  methods: {
    ...mapActions("settings", ["verifySettings"]),
    ...mapActions("posts", {setPostId: "setId"}),
    addDownloadPost(postData) {
      if (
        this.downloadsQueue.findIndex((post_id) => post_id.id == postData.id) >
        -1
      ) {
        console.warn("You are downloading this file right now!");
        return;
      }

      if (
        this.downloaded.findIndex((post_id) => post_id.id == postData.id) > -1
      ) {
        console.warn("You has already downloaded this file!");
        return;
      }

      this.$set(postData, "download", {});
      this.$set(postData.download, "state", "downloading");
      this.$set(postData.download, "progress", 0);

      this.downloadsQueue.push(postData);
      this.$events.$emit("downloadpost", postData);
    },
  },
  mounted: function () {
    Array.prototype.so = function (cb) {
      return new Promise((res, rej) => {
        try {
          let c = 0;
          for (; c < this.length; ) {
            cb(this[c]);
            if (c == this.length - 1) return res();
            ++c;
          }
        } catch (e) {
          return rej(e);
        }
      });
    };

    let self = this;

    this.$nextTick(() => {
      this.verifySettings();
      this.$initUpdater();
      this.$initPluginMan();

      this.$store.subscribeAction(({type, payload}) => {
        console.log({type, payload});
      })

      self.$events.$on("downloadpost", function (p) {
        let indx;
        d(r(p.file.url), {
          throttle: 250,
        })
          .on("progress", (st) => {
            indx = self.downloadsQueue.findIndex((idPost) => idPost.id == p.id);
            let percent = Math.round(st.percent * 100);
            self.$set(self.downloadsQueue[indx].download, "progress", percent);
          })
          .on("error", (err) => {
            indx = self.downloadsQueue.findIndex((idPost) => idPost.id == p.id);
            self.downloadsQueue[indx].download.state = "error";
            console.error(`Failed to download ${p.id} :: ${err}`);
          })
          .on("end", () => {
            indx = self.downloadsQueue.findIndex((idPost) => idPost.id == p.id);
            self.downloadsQueue[indx].download.state = "downloaded";
            self.downloaded.push(self.downloadsQueue[indx]);
            self.downloadsQueue.splice(indx, 1);
          })
          .pipe(
            fs.createWriteStream(
              `${JSON.parse(localStorage.settings).downloadLocation}/${p.id}.${
                p.file.ext
              }`
            )
          );
      });
    });
  },
};
</script>
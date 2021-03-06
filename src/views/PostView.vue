<template>
  <div
    id="postview-container"
    class="inline-flex w-full p-6 pb-0 overflow-hidden inset-y-0 flex-col"
    v-if="post"
  >
    <h2
      class="inline-flex items-center text-2xl font-bold uppercase text-dark-2 mb-4"
    >
      <button
        class="bg-blue-6 p-1 px-3 rounded-full text-white w-12 h-12 mr-4 hover:bg-blue-7 duration-200"
        @click="$router.push({ name: 'search' })"
      >
        <feather type="arrow-left" />
      </button>
      <span id="postid">{{ post.id }}</span>
      <a
        v-if="post.sources.length"
        :href="post.sources[0]"
        class="rounded py-1 px-3 flex items-center ml-4 text-base normal-case font-normal text-dark-2 hover:bg-dark-8 duration-200"
      >
        <feather type="external-link" class="mr-2" />
        <span v-text="$t('postview.openOriginal')"/>
      </a>
    </h2>
    <div id="postview-general" class="flex flex-wrap overflow-y-auto">
      <div id="postview-left" class="w-2/3">
        <div
          id="postview-sample"
          v-if="this.animatedExts.indexOf(post.file.ext) < 0"
          :class="{
            'blur': (post.rating === 'e' || post.rating === 'q') && blurNsfw && unblurNsfw !== 'onclick',
            'unblurHover': (post.rating === 'e' || post.rating === 'q') && blurNsfw && unblurNsfw === 'onhover',
          }"
        >
          <div class="overflow-hidden rounded mx-auto">
            <img
              :src="post.sample.url"
              :alt="post.id"
              class="rounded w-auto mx-auto"
            />
          </div>
        </div>
        <div
          id="postview-video"
          class="relative"
          v-else-if="post.file.ext === 'webm'"
        >
          <div id="postview-video-container" class="relative overflow-hidden">
            <video
              id="postview-player"
              :src="post.file.url"
              :alt="post.id"
              :width="post.file.width"
              :height="post.file.height"
              class="rounded w-full"
              ref="player"
              @play="vpSetStatus('playing')"
              @pause="vpSetStatus('paused')"
              @volumechange="vpVolStatus"
              @timeupdate="vpTime"
              @loadedmetadata="vpMeta"
            />
            <div
              id="postview-video-toggler"
              class="absolute inset-0 mb-16"
              @click="togglePlayer"
            ></div>
            <div
              id="postview-video-controls"
              class="flex absolute bottom-0 inset-x-0 px-4 h-8 duration-300"
            >
              <div id="pv-buttons" class="flex items-center">
                <button id="pv-toggle" @click="togglePlayer">
                  <feather type="play" v-if="this.videoStatus === 'paused'" />
                  <feather type="pause" v-else />
                </button>
                <button id="pv-repeat" @click="toggleRepeat" class="ml-4">
                  <feather
                    type="repeat"
                    :class="[this.videoRepeat ? 'opacity-100' : 'opacity-50']"
                  />
                </button>
                <button id="pv-volume" @click="vpVolToggle" class="ml-4">
                  <feather type="volume-2" v-if="this.videoVolume >= 0.5" />
                  <feather
                    type="volume-1"
                    v-else-if="this.videoVolume < 0.5 && this.videoVolume > 0"
                  />
                  <feather type="volume-x" v-else-if="this.videoVolume == 0" />
                </button>
                <div id="pv-volume-slider" class="inline-block ml-4 relative">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    v-model="videoVolume"
                    step="0.01"
                  />
                  <div id="pv-volume-sliderbar-current"></div>
                </div>
              </div>
              <div
                id="pv-timeline-container"
                class="flex items-center absolute inset-x-0 mx-4 translate-y-2"
              >
                <span
                  id="pv-timeline-current"
                  class="text-sm absolute left-0 select-none"
                  v-text="videoTime_p"
                />
                <input
                  type="range"
                  min="0"
                  :max="this.videoDuration"
                  v-model="videoTime"
                  @change="vpTimeSet"
                  @mousedown="togglePlayer('pause')"
                  @mouseup="togglePlayer('play')"
                  step="0.00001"
                />
                <div id="pv-timeline-sliderbar-current"></div>
                <span
                  id="pv-timeline-duration"
                  class="text-sm absolute right-0 select-none"
                  v-text="videoDuration_p"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="postview-swf" v-else-if="post.file.ext === 'swf'">
          <object
            type="application/x-shockwave-flash"
            :width="this.viewWidth"
            :height="this.viewHeight"
          >
            <param name="movie" :value="post.file.url" />
            <param name="wmode" value="transparent" />
          </object>
        </div>
        <div
          v-if="this.descParsed"
          id="postview-description"
          class="bg-dark-7 p-3 rounded mt-4 break-all whitespace-pre-line"
        >
          <h4 class="uppercase text-dark-2 font-bold mb-1 select-none" v-text="$t('postview.description')"/>
          <span v-html="this.descParsed"></span>
        </div>
      </div>
      <div id="postview-details" class="m-4 mt-0 w-1/4">
        <div id="postview-actions" class="mb-4">
          <btn
            v-if="queuePosts.findIndex((p) => p.id == post.id) === -1"
            id="postview-download-btn"
            @click.native="downloadPost"
            class="w-full"
            role="safe"
            v-text="$t('postview.download')"
          />
          <btn
            v-else-if="queuePostsPending.findIndex((p) => p.id == post.id) > -1"
            id="postview-downloading-btn"
            class="w-full"
            role="disabledBusy"
            v-text="$t('postview.downloadPending')"
          />
          <btn
            v-else-if="queuePostsDownloading.findIndex((p) => p.id == post.id) > -1"
            id="postview-downloading-btn"
            class="w-full"
            role="busy"
            v-text="$t('postview.downloading')"
          />
          <btn
            v-else-if="queuePostsDone.findIndex((p) => p.id == post.id) > -1"
            id="postview-downloaded-btn"
            class="w-full"
            role="disabled"
            v-text="$t('postview.downloaded')"
          />
          <btn
            v-if="!postInList"
            id="postview-addtolist-btn"
            class="w-full mt-2"
            @click.native="listPost"
            v-text="$t('postview.list')"
          />
          <btn
            v-else
            id="postview-removefromlist-btn"
            class="w-full mt-2"
            role="danger"
            @click.native="listPost"
            v-text="$t('postview.unlist')"
          />
        </div>
        <ul id="postview-details-list" class="flex flex-col">
          <li
            id="postview-size"
            class="bg-dark-7 p-3 rounded mb-2 break-all">
            <h4 class="uppercase text-dark-2 font-bold mb-1 select-none" v-text="$t('postview.details.fileSize')"/>
            <span v-text="convertBytes(post.file.size)"></span>
          </li>
          <li
            v-if="post.tags.artist.length > 1"
            id="postview-artists"
            class="bg-dark-7 p-3 rounded mb-2 break-all"
          >
            <h4 class="uppercase text-dark-2 font-bold mb-1 select-none" v-text="$tc('postview.details.artist', post.tags.artist.length)"/>
            <ul id="postview-artists-list">
              <li
                id="artist"
                v-for="(artist, index) in post.tags.artist"
                :key="index"
              >
                {{ artist }}
              </li>
            </ul>
          </li>
          <li
            v-else
            id="postview-artist"
            class="bg-dark-7 p-3 rounded mb-2 break-all"
          >
            <h4 class="uppercase text-dark-2 font-bold mb-1 select-none" v-text="$tc('postview.details.artist', 1)"/>
            <span>{{ post.tags.artist[0] }}</span>
          </li>
          <li id="postview-tags" class="bg-dark-7 p-3 rounded mb-2 break-all">
            <h4 class="uppercase text-dark-2 font-bold mb-1 select-none" v-text="$t('postview.details.tags.tags')"/>
            <div id="postview-tags-general" v-if="post.tags.general.length">
              <h5 class="text-dark-1 mb-1 select-none" v-text="$t('postview.details.tags.general')"/>
              <ul class="postview-tags-list">
                <li
                  class="postview-tag cursor-pointer text-blue-4 inline-block mx-1 my-1 px-3 rounded-full bg-dark-8 hover:underline"
                  v-for="tag in post.tags.general"
                  :key="tag"
                  @click="searchFor(tag)"
                  v-text="tag"
                ></li>
              </ul>
            </div>
            <div id="postview-tags-species" v-if="post.tags.species.length">
              <h5 class="text-dark-1 mb-1 select-none" v-text="$t('postview.details.tags.species')"/>
              <ul class="postview-tags-list">
                <li
                  class="postview-tag cursor-pointer text-orange-4 inline-block mx-1 my-1 px-3 rounded-full bg-dark-8 hover:underline"
                  v-for="tag in post.tags.species"
                  :key="tag"
                  @click="searchFor(tag)"
                  v-text="tag"
                ></li>
              </ul>
            </div>
            <div id="postview-tags-character" v-if="post.tags.character.length">
              <h5 class="text-dark-1 mb-1 select-none" v-text="$t('postview.details.tags.characters')"/>
              <ul class="postview-tags-list">
                <li
                  class="postview-tag cursor-pointer text-green-4 inline-block mx-1 my-1 px-3 rounded-full bg-dark-8 hover:underline"
                  v-for="tag in post.tags.character"
                  :key="tag"
                  @click="searchFor(tag)"
                  v-text="tag"
                ></li>
              </ul>
            </div>
            <div id="postview-tags-copyright" v-if="post.tags.copyright.length">
              <h5 class="text-dark-1 mb-1 select-none" v-text="$t('postview.details.tags.copyright')"/>
              <ul class="postview-tags-list">
                <li
                  class="postview-tag cursor-pointer text-pink-3 inline-block mx-1 my-1 px-3 rounded-full bg-dark-8 hover:underline"
                  v-for="tag in post.tags.copyright"
                  :key="tag"
                  @click="searchFor(tag)"
                  v-text="tag"
                ></li>
              </ul>
            </div>
            <div id="postview-tags-meta" v-if="post.tags.meta.length">
              <h5 class="text-dark-1 mb-1 select-none" v-text="$t('postview.details.tags.meta')"/>
              <ul class="postview-tags-list">
                <li
                  class="postview-tag cursor-pointer text-dark-1 inline-block mx-1 my-1 px-3 rounded-full bg-dark-8 hover:underline"
                  v-for="tag in post.tags.meta"
                  :key="tag"
                  @click="searchFor(tag)"
                  v-text="tag"
                ></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DText from "dtext-parser";
import * as ptime from "pretty-ms";
import bytes from "bytes";
import { mapGetters, mapActions } from "vuex";
import Btn from "@/components/Button.vue";

export default {
  name: "postView",
  props: ["post"],
  data() {
    return {
      animatedExts: ["swf", "webm"],
      descParsed: null,
      videoStatus: "paused",
      videoRepeat: false,
      videoVolume: 0,
      videoPreVolume: 0,
      videoMuted: false,
      videoTime: 0,
      videoDuration: 0,
      videoTime_p: "0:00",
      videoDuration_p: "0:00",
      viewWidth: 0,
      viewHeight: 0,
      nlinks: 0,
    };
  },
  components: {
    Btn
  },
  computed: {
    ...mapGetters("settings", ["setting"]),
    ...mapGetters("downloads", ["queuePosts", "queuePostsPending", "queuePostsDownloading", "queuePostsDone"]),
    ...mapGetters("posts", ["list"]),
    postInList() {
      return this.list.findIndex(p => p.id === this.post.id) > -1;
    },
    blurNsfw() {
      return this.setting("blurNsfw");
    },
    unblurNsfw() {
      return this.setting("unblurNsfw");
    }
  },
  watch: {
    videoVolume(v) {
      if (this.videoMuted) document.getElementById("postview-player").muted = false;
      document.getElementById("postview-player").volume = v;
      document.getElementById("pv-volume-sliderbar-current").style.width = `${100 * this.videoVolume - 0.01}%`;
    },
    videoRepeat(v) {
      document.getElementById("postview-player").loop = v;
    },
    videoMuted(v) {
      if (v) {
        this.videoPreVolume = document.getElementById("postview-player").volume;
        document.getElementById("postview-player").volume = 0;
      } else {
        if (this.videoPreVolume == 0) this.videoPreVolume = 0.5;
        document.getElementById("postview-player").volume = this.videoPreVolume;
      }

      document.getElementById("postview-player").muted = v;
    },
    videoTime(v) {
      try {
        document.getElementById(
          "pv-timeline-sliderbar-current"
        ).style.width = `${(v * 100) / this.videoDuration}%`;
        this.videoTime_p = ptime(v * 1000, {
          colonNotation: true,
          secondsDecimalDigits: 0,
          millisecondsDecimalDigits: 1000,
        });
      } catch (e) {
        console.log("Player destroyed or failed to load");
      }
    },
    videoDuration(v) {
      this.videoDuration_p = ptime(v * 1000, {
        colonNotation: true,
        secondsDecimalDigits: 0,
        millisecondsDecimalDigits: 1000,
      });
    },
  },
  methods: {
    ...mapActions("downloads", ["addQueuePost"]),
    ...mapActions("posts", ["pushToList", "delFromList"]),
    downloadPost() {
      this.addQueuePost(this.post);
    },
    listPost() {
      if (this.postInList) this.delFromList(this.post.id);
      else this.pushToList(this.post);
    },
    searchFor(tagName) {
      this.$router.push({ name: "search" });
      this.$root.$emit("searchByTag", tagName);
    },
    togglePlayer(f) {
      switch (f) {
        case "play":
          document.getElementById("postview-player").play();
          break;
        case "pause":
          document.getElementById("postview-player").pause();
          break;
        default:
          if (this.videoStatus === "paused")
            document.getElementById("postview-player").play();
          else document.getElementById("postview-player").pause();
          break;
      }
    },
    toggleRepeat() {
      if (this.videoRepeat) this.videoRepeat = false;
      else this.videoRepeat = true;
    },
    vpSetStatus(statusName) {
      this.videoStatus = statusName;
    },
    vpVolStatus() {
      this.videoVolume = document.getElementById("postview-player").volume;
    },
    vpVolToggle() {
      if (this.videoMuted) this.videoMuted = false;
      else this.videoMuted = true;
    },
    vpTime() {
      this.videoTime = document.getElementById("postview-player").currentTime;
    },
    vpTimeSet(e) {
      document.getElementById("postview-player").currentTime = e.target.value;
    },
    vpMeta() {
      this.vpVolStatus();
      this.videoDuration = document.getElementById("postview-player").duration;
    },
    convertBytes(n) {
      return bytes(n, { unitSeparator: " " });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.post) return this.$router.push({ name: "search" });
      DText.parse(this.post.description).then((dp) => {
        this.descParsed = dp;
      });

      this.viewWidth = document.getElementById("postview-left").offsetWidth;
      this.viewHeight = document.getElementById(
        "postview-general"
      ).offsetHeight;
    });
  },
};
</script>
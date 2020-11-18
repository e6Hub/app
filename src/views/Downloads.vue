<template>
  <div id="downloads-container" class="inline-block w-full p-6 relative">
    <h2 class="text-2xl font-bold uppercase text-gray-2">Downloads</h2>
    <div
      id="no-downloads-found"
      v-if="!this.$parent.downloadsQueue.length"
      class="text-center my-4"
    >
      No downloads found in this session...
      <router-link tag="a" to="/" class="text-blue-3"
        >wanna try?</router-link
      >
    </div>
    <btn
      v-if="this.$parent.postsList.length"
      id="download-posts-in-list"
      class="absolute top-0 right-0 m-8"
      @click.native="downloadListedPosts"
    >
      Download {{ this.$parent.postsList.length }} listed post(s)
    </btn>
    <ul id="downloads-panels" class="flex flex-wrap justify-center p-2 w-full">
      <li
        class="m-4 mb-8 w-32 cursor-pointer hover:opacity-75 duration-200"
        :class="{
          'blur': (post.rating === 'e' || post.rating === 'q') && blurNsfw,
          'unblurHover': (post.rating === 'e' || post.rating === 'q') && blurNsfw && unblurNsfw === 'onhover'
        }"
        v-for="post in this.$parent.downloadsQueue"
        :key="post.id"
      >
        <div class="mb-2 text-center text-gray-3">
          {{post.download.progress}}%
        </div>
        <PostItem
          :preview_url="post.preview.url"
          :rating="post.rating"
          :score="post.score.total"
          :id="post.id"
          :favs="post.fav_count"
          :ext="post.file.ext"
        />
      </li>
    </ul>
    <div id="downloaded-posts-container" v-if="this.$parent.downloaded.length">
      <h2 class="text-2xl font-bold uppercase text-gray-600">
        Downloaded posts
      </h2>
      <ul id="downloaded-panels" class="flex flex-wrap">
        <li
          class="flex m-3 bg-gray-7 overflow-hidden w-1/2 h-32 rounded relative cursor-pointer"
          :class="{
            'blur': (downloadedPost.rating === 'e' || downloadedPost.rating === 'q') && blurNsfw,
            'unblurHover': (downloadedPost.rating === 'e' || downloadedPost.rating === 'q') && blurNsfw && unblurNsfw === 'onhover'
          }"
          v-for="(downloadedPost, index) in this.$parent.downloaded"
          :key="index"
          @click="viewPost(downloadedPost)"
        >
          <img
            id="dPostImg"
            :src="downloadedPost.preview.url"
            :alt="downloadedPost.id"
            class="h-full"
          />
          <div id="postdetails" class="absolute right-0 top-0 m-4">
            <span id="postid">{{ downloadedPost.id }}</span
            ><br />
            <div id="favs" class="flex items-center text-pink-400">
              <feather type="heart" size="16" class="mr-1" />
              <span>{{ downloadedPost.fav_count }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Button.vue";
import PostItem from "@/components/PostItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "downloads",
  components: { Btn, PostItem },
  computed: {
    ...mapGetters("settings", ["setting"]),
    blurNsfw() {
      return this.setting("blurNsfw");
    },
    unblurNsfw() {
      return this.setting("unblurNsfw");
    }
  },
  methods: {
    viewPost(p) {
      if (!p || !p.id) return;
      this.$router.push({
        name: "postView",
        params: { post: p, id: p.id },
      });
    },
    downloadListedPosts() {
      console.log(this.$parent.postsList)
      this.$parent.postsList
        .so((post) => {
          this.$parent.addDownloadPost(post);
        })
        .then(() => {
          this.$parent.postsList = [];
        });
    },
  },
};
</script>
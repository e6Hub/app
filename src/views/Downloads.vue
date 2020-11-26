<template>
  <div id="downloads-container" class="inline-block w-full p-6 pb-0 relative overflow-y-auto">
    <h2 class="text-2xl font-bold uppercase text-dark-2 select-none">Downloads</h2>
    <div
      id="no-downloads-found"
      v-if="!queuePosts.length"
      class="text-center my-4"
    >
      No downloads found in this session...
      <router-link tag="a" to="/" class="text-blue-3"
        >wanna try?</router-link
      >
    </div>
    <btn
      v-if="list.length"
      id="download-posts-in-list"
      class="absolute top-0 right-0 m-8"
      @click.native="downloadListedPosts"
    >
      Download {{ list.length }} listed post(s)
    </btn>
    <div id="downloaded-posts-container" v-if="queuePosts.length">
      <h3 class="text-xl font-bold uppercase text-dark-3 select-none">
        Posts
      </h3>
      <ul id="downloads-panels" class="flex flex-wrap justify-center p-2 w-full">
        <li
          class="m-4 mb-8 w-32 cursor-pointer duration-200"
          :class="{
            'hover:opacity-75': post.status !== 'pending',
            'opacity-50': post.status === 'pending'
          }"
          v-for="(post, index) in queuePosts"
          :key="index"
          @click="viewPost(post)"
        >
          <div class="mb-2 text-center text-gray-3">
            {{post.progress}}%
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
    </div>
    <div id="downloaded-posts-container" v-if="queuePools.length">
      <h3 class="text-xl font-bold uppercase text-dark-3 select-none">
        Pools
      </h3>
      <ul id="downloaded-panels" class="flex flex-wrap justify-center p-2 w-full">
        <li
          class="m-4 mb-8 w-32 cursor-pointer hover:opacity-75 duration-200"
          v-for="(pool, index) in queuePools"
          :key="index"
          @click="viewPool(pool)"
        >
          <div class="mb-2 text-center text-gray-3">
            {{pool.progress}}%
          </div>
          <PostItem
            :preview_url="pool.posts[0].preview.url"
            :rating="pool.posts[0].rating"
            :score="pool.posts[0].score.total"
            :id="pool.posts[0].id"
            :favs="pool.posts[0].fav_count"
            :ext="pool.posts[0].file.ext"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Button.vue";
import PostItem from "@/components/PostItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "downloads",
  components: { Btn, PostItem },
  computed: {
    ...mapGetters("settings", ["setting"]),
    ...mapGetters("posts", ["list"]),
    ...mapGetters("downloads", ["queuePosts", "queuePools"]),
    blurNsfw() {
      return this.setting("blurNsfw");
    },
    unblurNsfw() {
      return this.setting("unblurNsfw");
    }
  },
  methods: {
    ...mapActions("downloads", ["addQueuePost"]),
    ...mapActions("posts", ["delFromList"]),
    viewPost(p) {
      if (!p || !p.id) return;
      this.$router.push({
        name: "postView",
        params: { post: p, id: p.id },
      });
    },
    viewPool(p) {
      if (!p || !p.id) return;
      this.$router.push({
        name: "poolView",
        params: { pool: p, id: p.id },
      });
    },
    downloadListedPosts() {
      this.list.forEach((post, i) => {
        setTimeout(() => {
          this.delFromList(post.id);
          this.addQueuePost(post);
        }, i);
      });
    },
  },
};
</script>
<template>
  <div id="downloads-container" class="inline-block w-full p-6 relative">
    <h2 class="text-2xl font-bold uppercase text-gray-600">Downloads</h2>
    <div
      id="no-downloads-found"
      v-if="!this.$parent.downloadsQueue.length"
      class="text-center my-4"
    >
      Wanna download something?
      <router-link tag="a" to="/" class="text-indigo-200"
        >go ahead!</router-link
      >
    </div>
    <button
      v-if="this.$parent.postsList.length"
      id="download-posts-in-list"
      class="bg-indigo-400 py-2 px-3 rounded shadow-lg absolute top-0 right-0 m-8"
      @click="downloadListedPosts"
    >
      Download {{ this.$parent.postsList.length }} listed posts
    </button>
    <ul id="downloads-panels" class="flex flex-wrap dPanel">
      <li
        id="download-active"
        class="flex m-3 bg-gray-700 overflow-hidden w-1/2 h-32 rounded relative"
        v-for="post in this.$parent.downloadsQueue"
        v-bind:key="post.id"
      >
        <img
          id="dPostImg"
          :src="post.preview.url"
          :alt="post.id"
          class="h-full"
        />
        <div id="postdetails" class="absolute right-0 top-0 m-4">
          <span id="postid">{{ post.id }}</span
          ><br />
          <div id="favs" class="flex items-center text-pink-400">
            <feather type="heart" size="16" class="mr-1" />
            <span>{{ post.fav_count }}</span>
          </div>
        </div>
        <div id="postdownloading">
          <span id="download-progress">{{ post.download.progress }}%</span>
        </div>
      </li>
    </ul>
    <div id="downloaded-posts-container" v-if="this.$parent.downloaded.length">
      <h2 class="text-2xl font-bold uppercase text-gray-600">
        Downloaded posts
      </h2>
      <ul id="downloaded-panels" class="flex flex-wrap dPanel">
        <li
          id="download-done"
          class="flex m-3 bg-gray-700 overflow-hidden w-1/2 h-32 rounded relative cursor-pointer"
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
export default {
  name: "downloads",
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
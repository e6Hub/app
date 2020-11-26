<template>
  <div id="search-container" class="inline-block flex-wrap w-full p-6">
    <h2 class="text-2xl font-bold uppercase text-dark-2 select-none">Search posts</h2>
    <div id="search-panels" class="flex flex-warp flex-col h-full">
      <div id="search-opts" class="border-b border-dark-7 w-full py-2 mb-2">
        <form action="#" @submit="searchPosts">
          <div v-if="errors.length">
            <ul>
              <li v-for="(err, index) in errors" :key="index">
                <div
                  class="bg-red-8 text-white px-4 py-3 rounded relative mb-4"
                >
                  <span class="block sm:inline">{{ err }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="e6h__inputsearch"
            class="flex items-center"
          >
            <input
              :value="tags"
              @input="inputTags"
              type="text"
              name="tags"
              id="search-tags"
              class="rounded mr-2 px-2 py-1 bg-dark-6 focus:bg-dark-5 outline-none focus:outline-none duration-200 text-base"
            />
            <button
              type="submit"
              id="search-posts-btn"
              class="inline-flex items-center bg-blue-6 hover:bg-blue-7 py-1 px-3 rounded duration-200"
            >
              <feather type="search" size="16" class="mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>
      <div
        id="posts-empty"
        class="text-center py-8 text-gray-4"
        v-if="!posts.length"
      >
        <span v-if="fetching">Loading...</span>
        <span v-else>No posts to see here...</span>
      </div>
      <div
        id="e6h__global_blacklist_notice"
        class="text-center text-gray-4 py-1"
        v-if="posts.filter(p => !p.file.url).length"
      >
        There are {{posts.filter(p => !p.file.url).length}} post(s) hidden due to global blacklist rule. <e-link href="https://e621.net/help/global_blacklist"
        >Learn more about this</e-link>.
      </div>
      <ul
        id="search-list"
        ref="posts_container"
        class="flex flex-wrap justify-center p-2 w-full h-24 overflow-y-auto flex-1"
      >
        <li
          v-for="(post, index) in posts.filter(p => p.file.url)"
          v-bind:key="index"
          class="m-4 mb-8 w-32 cursor-pointer hover:opacity-75 duration-200"
          @contextmenu="listPost(post)"
          @click="viewPost(post.id)"
        >
          <PostItem
            :preview_url="post.preview.url"
            :rating="post.rating"
            :score="post.score.total"
            :id="post.id"
            :favs="post.fav_count"
            :ext="post.file.ext"
          />
        </li>
        <div
          id="search-nomore"
          class="text-center py-8 text-gray-6 w-full"
          v-if="lastPage"
        >
          <span>No more posts here</span>
        </div>
      </ul>
      <div
        id="search-notfound"
        class="text-center py-8 text-gray-6"
        v-if="noPosts"
      >
        <span>Oh? no posts that matches with your tags</span>
      </div>
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import eLink from "@/components/ExternalLink.vue";
import * as _ from "request-promise-native";
import { version as appVer } from "../../package.json";
import { mapGetters, mapActions } from "vuex";

export default {
  replace: false,
  components: { PostItem, eLink },
  data() {
    return {
      posts: [],
      errors: [],
      fetching: false,
      page: 1,
      lastPage: false,
      noPosts: false,
    };
  },
  computed: {
    ...mapGetters("search", ["tags"]),
    ...mapGetters("posts", ["list"])
  },
  methods: {
    ...mapActions("search", ["setTags"]),
    ...mapActions("posts", ["pushToList", "delFromList"]),
    inputTags(e) {
      this.setTags(e.target.value);
    },
    searchPosts(e, cont = false) {
      if (!cont) {
        this.posts = [];
        this.page = 1;
      } else ++this.page;
      
      this.errors = [];
      this.fetching = true;
      this.noPosts = false;
      this.lastPage = false;

      _({
        uri: "https://e621.net/posts.json",
        qs: {
          tags: this.tags,
          limit: 60,
          page: this.page,
        },
        headers: {
          "User-Agent": `e6Hub/${appVer} (by AerysSaektide on e621)`,
        },
        json: true,
      })
        .then((d) => {
          if (!this.posts.length && !d.posts.length) this.noPosts = true;
          else if (this.posts.length && d.posts.length < 60)
            this.lastPage = true;
          this.displayPosts(d.posts);
        })
        .catch((err) => {
          this.errors.push(
            "An unexpected error ocurred! Check the Dev Console"
          );
          console.warn(err);
          this.fetching = false;
        });

      if (e) e.preventDefault();
    },
    displayPosts(postsData) {
      this.fetching = false;
      if (!postsData.length) return;
      postsData.forEach((post) => {
        this.posts.push(post);
      });
      localStorage.posts = JSON.stringify(this.posts);

      document.getElementById("search-list").addEventListener("scroll", (e) => {
        if (this.lastPage) return;
        const el = e.target,
          lmt = el.scrollHeight - el.offsetHeight,
          scrl = el.scrollTop;

        if (scrl > lmt - 150 && !this.fetching) this.searchPosts(null, true);
      });
    },
    viewPost(postid) {
      let thisPost = JSON.parse(localStorage.posts).find(
        (post_id) => post_id.id == postid
      );
      if (!thisPost) return;
      this.$router.push({
        name: "postView",
        params: { post: thisPost, id: thisPost.id },
      });
    },
    listPost(post) {
      if (this.list.findIndex(p => p.id === post.id) > -1) this.delFromList(post.id);
      else this.pushToList(post);
    },
  },
  mounted() {
    this.$root.$on("searchByTag", (t) => {
      this.setTags(t);
      this.searchPosts();
    });
  },
};
</script>
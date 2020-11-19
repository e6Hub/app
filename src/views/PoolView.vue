<template>
  <div
    id="poolview-container"
    class="inline-flex w-full p-6 pb-0 overflow-hidden inset-y-0 flex-col"
  >
    <h2
      class="inline-flex items-center text-2xl font-bold uppercase text-dark-2 mb-4"
    >
      <button
        class="bg-blue-6 p-1 px-3 rounded-full text-white w-12 h-12 mr-4 hover:bg-blue-7 duration-200"
        @click="$router.push({ name: 'searchpools' })"
      >
        <feather type="arrow-left" />
      </button>
      <span id="poolview-poolname">{{ pool.name.replace(/_/g, ' ') }}</span>
    </h2>
    <div
      id="e6h__global_blacklist_notice"
      class="text-center text-gray-4 py-1"
      v-if="posts.filter(p => !p.file.url).length"
    >
      There are {{posts.filter(p => !p.file.url).length}} post(s) hidden due to global blacklist rule. <e-link href="https://e621.net/help/global_blacklist"
      >Learn more about this</e-link>.
    </div>
    <div
      id="poolview-content"
      class="flex flex-col flex-auto overflow-y-auto"
    >
      <div
        id="poolview-description"
        class="border-b border-dark-7 pb-4 mb-4 whitespace-pre"
        v-text="pool.description"
      />
      <div
        id="posts-empty"
        class="text-center py-8 text-gray-4"
        v-if="!posts.length"
      >
        <span v-if="fetching">Loading...</span>
        <span v-else>This pool is empty... or not?</span>
      </div>
      <ul
        id="poolview-list"
        class="flex flex-wrap justify-center p-2 w-full items-start"
      >
        <li
          v-for="(post, index) in sortedPosts.filter(p => p).filter(p => p.file.url)"
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
          id="poolview-nomore"
          class="text-center py-8 text-gray-6 w-full"
          v-if="lastPage"
        >
          <span>No more posts here</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Button.vue";
import PostItem from "@/components/PostItem.vue";
import * as _ from "request-promise-native";
import { version as appVer } from "../../package.json";

export default {
  name: "poolView",
  props: ["pool"],
  components: {
    Btn,
    PostItem
  },
  data() {
    return {
      posts: [],
      sortedPosts: [],
      errors: [],
      fetching: true,
      page: 1,
      lastPage: false,
      noPosts: false,
    }
  },
  methods: {
    searchPosts(e, cont = false) {
      if (!cont) this.posts = []; this.page = 1;

      this.errors = [];
      this.fetching = true;
      this.noPosts = false;
      this.lastPage = false;

      _({
        uri: "https://e621.net/posts.json",
        qs: {
          tags: `pool:${this.pool.id}`,
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

      this.posts = postsData;
      this.sortedPosts = [];
      this.pool.post_ids.forEach(candidateId => { this.sortedPosts.push(this.posts.find(post => post.id == candidateId)) })

      localStorage.posts = JSON.stringify(this.posts);

      document.getElementById("poolview-content").addEventListener("scroll", (e) => {
        if (this.lastPage) return;
        const el = e.target,
          lmt = el.scrollHeight - el.offsetHeight,
          scrl = el.scrollTop;
        if (scrl > lmt - 150 && !this.fetching) {
          ++this.page;
          this.searchPosts(null, true);
        }
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
      let indx = this.$parent.postsList.findIndex((p) => p.id == post.id);
      if (indx > -1) this.$parent.postsList.splice(indx, 1);
      else this.$parent.postsList.push(post);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.searchPosts();
    })
  }
}
</script>
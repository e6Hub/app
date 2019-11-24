<template>
    <div id="search-container" class="inline-block flex-wrap w-full p-6">
        <h2 class="text-2xl font-bold uppercase text-gray-600">Search</h2>
        <div id="search-panels" class="flex flex-warp flex-col h-full">
            <div id="posts-opts" class="border-b border-gray-700 w-full p-2 mb-2">
                <form action="#" @submit="searchPosts">
                    <div v-if="errors.length">
                        <ul>
                            <li v-for="(err, index) in errors" :key="index">
                                <div class="bg-red-800 text-white px-4 py-3 rounded relative mb-4" role="alert">
                                    <span class="block sm:inline">{{err}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <input v-model="tags" type="text" name="tags" id="search-tags" class="rounded mr-2 px-2 py-1 bg-gray-700 focus:bg-gray-600 focus:outline-none transition-100 text-base" />
                    <button type="submit" id="search-posts-btn" class="bg-indigo-500 p-1 px-3 rounded">Search posts</button>
                </form>
            </div>
            
            <ul v-if="posts.length" id="posts-list" ref="posts_container" class="flex flex-wrap justify-center p-2 w-full h-24 overflow-y-auto flex-1">
                <li v-for="(post, index) in posts" v-bind:key="index" class="m-4 mb-8 max-w-xl w-32 cursor-pointer hover:opacity-75 transition-100" @click="viewPost(post.id)">
                    <PostItem :preview_url="post.preview_url" :rating="post.rating" :score="post.score" :id="post.id" :favs="post.fav_count"/>
                </li>
            </ul>
            <div id="posts-empty" class="text-center py-8 text-gray-600" v-else>
                <span v-if="fetching">Loading...</span>
                <span v-else>No posts to see here...</span>
            </div>
        </div>
    </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';
import * as _ from 'request-promise-native';

export default {
    replace: false,
    components: { PostItem },
    data() {
        return {
            posts: [],
            errors: [],
            tags: null,
            fetching: false
        }
    },
    mounted() {
        let self = this;
    },
    methods: {
        searchPosts(e) {
            let self = this;
            this.posts = [];
            this.errors = [];
            this.fetching = true;

            _({
                uri: 'https://e621.net/post/index.json',
                qs: {
                    tags: this.tags,
                    limit: 80
                },
                headers: {
                    'User-Agent': 'e6Hub/3.0.0 canary (by AerysSaektide on e621)'
                },
                json: true
            }).then((d) => {
                this.displayPosts(d);
            }).catch(err => {
                this.errors.push('An unexpected error ocurred! Check the Dev Console');
                console.warn(err);
                this.fetching = false;
            });

            e.preventDefault();
        },
        displayPosts(postsData) {
            this.fetching = false;
            postsData.forEach(post => {
                this.posts.push(post);
            });
            localStorage.posts = JSON.stringify(this.posts);
        },
        viewPost(postid) {
            let thisPost = JSON.parse(localStorage.posts).find(post_id => post_id.id == postid);
            if (!thisPost) return;
            this.$router.push({
                name: 'postView',
                params: { post: thisPost }
            })
        }
    }
}
</script>
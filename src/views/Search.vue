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
                    <input v-model="tags" type="text" name="tags" id="search-tags" class="rounded mr-2 px-2 py-1 bg-gray-700 focus:bg-gray-600 focus:outline-none duration-200 text-base" />
                    <button type="submit" id="search-posts-btn" class="inline-flex items-center bg-indigo-500 p-1 px-3 rounded">
                        <feather type="search" size="16" class="mr-2"/>
                        Search posts
                    </button>
                </form>
            </div>
            <div id="posts-empty" class="text-center py-8 text-gray-600" v-if="!posts.length">
                <span v-if="fetching">Loading...</span>
                <span v-else>No posts to see here...</span>
            </div>
            <ul id="posts-list" ref="posts_container" class="flex flex-wrap justify-center p-2 w-full h-24 overflow-y-auto flex-1">
                <li v-for="(post, index) in posts" v-bind:key="index" class="m-4 mb-8 max-w-xl w-32 cursor-pointer hover:opacity-75 duration-200" @contextmenu="listPost(post)" @click="viewPost(post.id)">
                    <PostItem :preview_url="post.preview.url" :rating="post.rating" :score="post.score.total" :id="post.id" :favs="post.fav_count" :ext="post.file.ext"/>
                </li>
                <div id="posts-nomore" class="text-center py-8 text-gray-600 w-full" v-if="lastPage">
                    <span>No more posts here</span>
                </div>
            </ul>
            <div id="posts-notfound" class="text-center py-8 text-gray-600" v-if="noPosts">
                <span>Oh? no posts that matches with your tags</span>
            </div>
        </div>
    </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';
import * as _ from 'request-promise-native';
import { version as appVer } from '../../package.json';

export default {
    replace: false,
    components: { PostItem },
    data() {
        return {
            posts: [],
            errors: [],
            fetching: false,
            page: 1,
            lastPage: false,
            noPosts: false
        }
    },
    computed: {
        tags: {
            get() {
                return this.$parent.tags;
            },
            set(t) {
                this.$parent.tags = t;
            }
        }
    },
    methods: {
        searchPosts(e, cont = false) {
            if (!cont) this.posts = [];
            if (!cont) this.page = 1;
            this.errors = [];
            this.fetching = true;
            this.noPosts = false;
            this.lastPage = false;

            _({
                uri: 'https://e621.net/posts.json',
                qs: {
                    tags: this.tags,
                    limit: 40,
                    page: this.page
                },
                headers: {
                    'User-Agent': `e6Hub/${appVer} (by AerysSaektide on e621)`
                },
                json: true
            }).then((d) => {
                console.log(d.posts)
                if (!this.posts.length && !d.posts.length) this.noPosts = true;
                else if (this.posts.length && d.posts.length < 40) this.lastPage = true;
                this.displayPosts(d.posts);
            }).catch(err => {
                this.errors.push('An unexpected error ocurred! Check the Dev Console');
                console.warn(err);
                this.fetching = false;
            });

            if (e) e.preventDefault();
        },
        displayPosts(postsData) {
            this.fetching = false;
            if (!postsData.length) return; 
            postsData.forEach(post => {
                this.posts.push(post);
            });
            localStorage.posts = JSON.stringify(this.posts);
            this.$events.$emit('state-changed-rpc', {type: 'SEARCHING'});

            document.getElementById('posts-list').addEventListener('scroll', (e) => {
                if (this.lastPage) return;
                let el = e.target;
                let lmt = el.scrollHeight - el.offsetHeight;
                let scrl = el.scrollTop;
                if (scrl > lmt - 150 && !this.fetching) {
                    ++this.page;
                    this.searchPosts(null, true);
                }
            });
        },
        viewPost(postid) {
            let thisPost = JSON.parse(localStorage.posts).find(post_id => post_id.id == postid);
            if (!thisPost) return;
            this.$router.push({
                name: 'postView',
                params: { post: thisPost, id: thisPost.id }
            })
        },
        listPost(post) {
            let indx = this.$parent.postsList.findIndex(p => p.id == post.id);
            if (indx > -1) this.$parent.postsList.splice(indx, 1);
            else this.$parent.postsList.push(post);
        }
    },
    mounted() {
        this.$root.$on('searchByTag', (t) => {
            this.tags = t
            this.searchPosts()
        });
    }
}
</script>
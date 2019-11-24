<template>
    <div id="downloads-container" class="inline-block flex-wrap w-full p-6">
        <h2 class="text-2xl font-bold uppercase text-gray-600">Downloads</h2>
        <ul id="downloads-panels" class="flex flex-warp">
            <li id="download-active" class="flex m-3 bg-gray-700 overflow-hidden w-1/2 h-32 rounded relative" v-for="post in this.$parent.downloadsQueue" v-bind:key="post.id">
                <img :src="post.preview_url" :alt="post.id" class="h-full">
                <div id="postdetails" class="absolute right-0 top-0 m-4">
                    <span id="postid">{{post.id}}</span><br/>
                    <span id="download-progress">{{post.download.progress}}%</span>
                </div>
            </li>
        </ul>
        <div id="downloaded-posts-container" v-if="this.$parent.downloaded.length">
            <h2 class="text-2xl font-bold uppercase text-gray-600">Downloaded posts</h2>
            <ul id="downloaded-panels" class="flex flex-warp">
                <li id="download-done" class="flex m-3 bg-gray-700 overflow-hidden w-1/2 h-32 rounded relative cursor-pointer" v-for="(downloadedPost, index) in this.$parent.downloaded" :key="index" @click="viewPost(downloadedPost.id)">
                    <img :src="downloadedPost.preview_url" :alt="downloadedPost.id" class="h-full">
                    <div id="postdetails" class="absolute right-0 top-0 m-4">
                        <span id="postid">{{downloadedPost.id}}</span><br/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'downloads',
    methods: {
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
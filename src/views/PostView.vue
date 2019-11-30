<template>
    <div id="postview-container" class="inline-flex w-full p-6 overflow-hidden inset-y-0 flex-col">
        <h2 class="inline-flex items-center text-2xl font-bold uppercase text-gray-600 mb-4">
            <button class="focus:outline-none bg-indigo-500 p-1 px-3 rounded-full text-white w-12 h-12 mr-4 hover:bg-indigo-400 transition-250" @click="$router.go(-1)"><i class="material-icons">arrow_back</i></button>
            <span id="postid">{{post.id}}</span>
            <a v-if="post.source" :href="post.source" @click="openExternal" class="rounded py-1 px-3 flex items-center ml-4 text-base normal-case font-normal text-gray-400 hover:bg-gray-700 transition-250">
                <i class="material-icons mr-1">exit_to_app</i>Open original
            </a>
        </h2>
        <div id="postview-general" class="flex flex-wrap overflow-y-auto">
            <div id="postview-sample" class="w-2/3 flex justify-center">
                <img :src="post.sample_url" :alt="post.id" class="rounded">
            </div>
            <div id="postview-details" class="m-4 mt-0 w-1/4">
                <div id="postview-actions" class="mb-4">
                    <button v-if="!this.$parent.downloadsQueue.find(p => p.id == post.id) && !this.$parent.downloaded.find(p => p.id == post.id)" id="postview-download-btn" @click="downloadPost" class="bg-green-400 py-2 w-full rounded hover:bg-green-500 shadow-lg hover:shadow-xl transition-100">Download</button>
                    <button v-else-if="this.$parent.downloadsQueue.find(p => p.id == post.id) && !this.$parent.downloaded.find(p => p.id == post.id)" id="postview-downloading-btn" class="bg-indigo-400 py-2 w-full rounded hover:bg-indigo-500 shadow-lg hover:shadow-xl transition-100">Downloading</button>
                    <button v-else-if="!this.$parent.downloadsQueue.find(p => p.id == post.id) && this.$parent.downloaded.find(p => p.id == post.id)" id="postview-downloaded-btn" class="bg-gray-600 py-2 w-full rounded hover:bg-gray-700 shadow-lg hover:shadow-xl transition-100">Downloaded</button>
                </div>
                <ul id="postview-details-list" class="flex flex-col">
                    <li v-if="post.artist.length > 1" id="artists" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Artists</h4>
                        <ul id="postview-artists-list">
                            <li id="artist" v-for="(artist, index) in post.artist" :key="index">{{artist}}</li>
                        </ul>
                    </li>
                    <li v-else id="artist" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Artist</h4>
                        <span>{{post.artist[0]}}</span>
                    </li>
                    <li id="uploader" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Uploader</h4>
                        <span>{{post.author}}</span>
                    </li>
                    <li v-if="post.description" id="description" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Description</h4>
                        <span>{{post.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'postView',
    props: [ 'post' ],
    methods: {
        openExternal(e) {
            e.preventDefault();
            require("electron").shell.openExternal(e.target.getAttribute('href'));
        },
        downloadPost() {
            this.$parent.addDownloadPost(this.post);
        }
    }
}
</script>
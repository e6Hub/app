<template>
    <div id="postview-container" class="inline-flex w-full p-6 overflow-hidden inset-y-0 flex-col">
        <h2 class="inline-flex items-center text-2xl font-bold uppercase text-gray-600 mb-4">
            <button class="focus:outline-none bg-indigo-500 p-1 px-3 rounded-full text-white w-12 h-12 mr-4 hover:bg-indigo-400 duration-200" @click="$router.push({name: 'search'})"><feather type="arrow-left"/></button>
            <span id="postid">{{post.id}}</span>
            <a v-if="post.sources.length" :href="post.sources[0]" @click="openExternal" class="rounded py-1 px-3 flex items-center ml-4 text-base normal-case font-normal text-gray-400 hover:bg-gray-700 duration-200">
                <feather type="external-link" class="mr-2"/>Open original
            </a>
        </h2>
        <div id="postview-general" class="flex flex-wrap overflow-y-auto">
            <div id="postview-sample" class="w-2/3 flex justify-center h-full" v-if="this.animatedExts.indexOf(post.file.ext) < 0">
                <img :src="post.sample.url" :alt="post.id" class="rounded w-auto h-full">
            </div>
            <div id="postview-video" class="w-2/3 flex justify-center h-full relative" v-else-if="post.file.ext === 'webm'">
                <video :src="post.file.url" :alt="post.id" class="rounded w-full"></video>
                <div id="postview-video-controls" class="absolute bottom-0 inset-x-0">
                    <div id="pv-buttons">
                        <button class="bg-transparent" id="pv-play">
                            <feather type="play"/>
                        </button>
                        <button class="bg-transparent" id="pv-pause">
                            <feather type="pause"/>
                        </button>
                        <button class="bg-transparent" id="pv-volume">
                            <feather type="volume-2"/>
                        </button>
                    </div>
                </div>
            </div>
            <div id="postview-swf" v-else-if="post.file.ext === 'swf'">
                <h2 class="inline-flex items-center text-2xl font-bold uppercase text-gray-600 mb-4">SWF is no supported yet</h2>
                <p>The SWF player feature might be included on a future version of this app, sadly we don't have any plans to port it to e6Hub.</p>
            </div>
            <div id="postview-details" class="m-4 mt-0 w-1/4">
                <div id="postview-actions" class="mb-4">
                    <button v-if="!this.$parent.downloadsQueue.find(p => p.id == post.id) && !this.$parent.downloaded.find(p => p.id == post.id)" id="postview-download-btn" @click="downloadPost" class="bg-green-400 py-2 w-full rounded hover:bg-green-500 shadow-lg hover:shadow-xl duration-200">Download</button>
                    <button v-else-if="this.$parent.downloadsQueue.find(p => p.id == post.id) && !this.$parent.downloaded.find(p => p.id == post.id)" id="postview-downloading-btn" class="bg-indigo-400 py-2 w-full rounded hover:bg-indigo-500 shadow-lg hover:shadow-xl duration-200">Downloading</button>
                    <button v-else-if="!this.$parent.downloadsQueue.find(p => p.id == post.id) && this.$parent.downloaded.find(p => p.id == post.id)" id="postview-downloaded-btn" class="bg-gray-600 py-2 w-full rounded hover:bg-gray-700 shadow-lg hover:shadow-xl duration-200">Downloaded</button>
                    <button v-if="!this.$parent.postsList.find(p => p.id == post.id)" id="postview-addtolist-btn" @click="listPost" class="bg-indigo-400 py-2 w-full rounded hover:bg-indigo-500 shadow-lg hover:shadow-xl duration-200 mt-2">Add to list</button>
                    <button v-else id="postview-removefromlist-btn" @click="listPost" class="bg-red-400 py-2 w-full rounded hover:bg-red-500 shadow-lg hover:shadow-xl duration-200 mt-2">Remove from list</button>
                </div>
                <ul id="postview-details-list" class="flex flex-col">
                    <li v-if="post.tags.artist.length > 1" id="artists" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Artists</h4>
                        <ul id="postview-artists-list">
                            <li id="artist" v-for="(artist, index) in post.artist" :key="index">{{artist}}</li>
                        </ul>
                    </li>
                    <li v-else id="postview-artist" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Artist</h4>
                        <span>{{post.tags.artist[0]}}</span>
                    </li>
                    <li v-if="this.descParsed" id="postview-description" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Description</h4>
                        <span v-html="this.descParsed"></span>
                    </li>
                    <li id="postview-tags" class="bg-gray-700 p-3 rounded mb-2 break-all">
                        <h4 class="uppercase text-gray-500 font-bold mb-1">Tags</h4>
                        <div id="postview-tags-general" v-if="post.tags.general.length">
                            <h5 class="text-gray-500 mb-1">General</h5>
                            <ul class="postview-tags-list">
                                <li class="postview-tag cursor-pointer text-gray-500 inline-block mx-1 my-1 px-3 rounded-full bg-gray-800 hover:underline" v-for="(tag) in post.tags.general" :key="tag" @click="searchFor(tag)" v-text="tag"></li>
                            </ul>
                        </div>
                        <div id="postview-tags-species" v-if="post.tags.species.length">
                            <h5 class="text-gray-500 mb-1">Species</h5>
                            <ul class="postview-tags-list">
                                <li class="postview-tag cursor-pointer text-orange-500 inline-block mx-1 my-1 px-3 rounded-full bg-gray-800 hover:underline" v-for="(tag) in post.tags.species" :key="tag" @click="searchFor(tag)" v-text="tag"></li>
                            </ul>
                        </div>
                        <div id="postview-tags-character" v-if="post.tags.character.length">
                            <h5 class="text-gray-500 mb-1">Characters</h5>
                            <ul class="postview-tags-list">
                                <li class="postview-tag cursor-pointer text-green-500 inline-block mx-1 my-1 px-3 rounded-full bg-gray-800 hover:underline" v-for="(tag) in post.tags.character" :key="tag" @click="searchFor(tag)" v-text="tag"></li>
                            </ul>
                        </div>
                        <div id="postview-tags-copyright" v-if="post.tags.copyright.length">
                            <h5 class="text-gray-500 mb-1">Copyrights</h5>
                            <ul class="postview-tags-list">
                                <li class="postview-tag cursor-pointer text-purple-500 inline-block mx-1 my-1 px-3 rounded-full bg-gray-800 hover:underline" v-for="(tag) in post.tags.copyright" :key="tag" @click="searchFor(tag)" v-text="tag"></li>
                            </ul>
                        </div>
                        <div id="postview-tags-meta" v-if="post.tags.meta.length">
                            <h5 class="text-gray-500 mb-1">Meta</h5>
                            <ul class="postview-tags-list">
                                <li class="postview-tag cursor-pointer text-indigo-500 inline-block mx-1 my-1 px-3 rounded-full bg-gray-800 hover:underline" v-for="(tag) in post.tags.meta" :key="tag" @click="searchFor(tag)" v-text="tag"></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import DText from 'dtext-parser'

export default {
    name: 'postView',
    props: [ 'post' ],
    data() {
        return {
            animatedExts: ['swf', 'webm'],
            descParsed: null
        }
    },
    methods: {
        openExternal(e) {
            e.preventDefault();
            require("electron").shell.openExternal(e.target.getAttribute('href'));
        },
        downloadPost() {
            this.$parent.addDownloadPost(this.post);
        },
        listPost() {
            let indx = this.$parent.postsList.findIndex(p => p.id == this.post.id);
            if (indx > -1) this.$parent.postsList.splice(indx, 1);
            else this.$parent.postsList.push(this.post);
        },
        searchFor(tagName) {
            this.$router.push({name: 'search'})
            this.$root.$emit('searchByTag', tagName)
        }
    },
    mounted() {
        this.$nextTick(() => {
            DText.parse(this.post.description).then((dp) => {
                this.descParsed = dp;
            })
        })
    }
}
</script>
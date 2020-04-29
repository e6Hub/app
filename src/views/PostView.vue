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
            <div id="postview-left" class="w-2/3">
                <div id="postview-sample" v-if="this.animatedExts.indexOf(post.file.ext) < 0">
                    <img :src="post.sample.url" :alt="post.id" class="rounded w-auto">
                </div>
                <div id="postview-video" class="relative" v-else-if="post.file.ext === 'webm'">
                    <div id="postview-video-container" class="relative overflow-hidden">
                        <video id="postview-player" :src="post.file.url" :alt="post.id" :width="post.file.width" :height="post.file.height" class="rounded w-full" ref="player" @play="vpSetStatus('playing')" @pause="vpSetStatus('paused')" @volumechange="vpVolStatus" @timeupdate="vpTime" @loadedmetadata="vpMeta"/>
                        <div id="postview-video-toggler" class="absolute inset-0 mb-16" @click="togglePlayer"></div>
                        <div id="postview-video-controls" class="flex absolute bottom-0 inset-x-0 px-4 h-8 duration-300">
                            <div id="pv-buttons" class="flex items-center">
                                <button id="pv-toggle" @click="togglePlayer">
                                    <feather type="play" v-if="this.videoStatus === 'paused'"/>
                                    <feather type="pause" v-else/>
                                </button>
                                <button id="pv-repeat" @click="toggleRepeat" class="ml-4">
                                    <feather type="repeat" :class="[this.videoRepeat ? 'opacity-100' : 'opacity-50']"/>
                                </button>
                                <button id="pv-volume" @click="vpVolToggle" class="ml-4">
                                    <feather type="volume-2" v-if="this.videoVolume >= .5"/>
                                    <feather type="volume-1" v-else-if="this.videoVolume < .5 && this.videoVolume > 0"/>
                                    <feather type="volume-x" v-else-if="this.videoVolume == 0"/>
                                </button>
                                <div id="pv-volume-slider" class="inline-block ml-4 relative">
                                    <input type="range" min="0" max="1" v-model="videoVolume" step="0.01"/>
                                    <div id="pv-volume-sliderbar-current"></div>
                                </div>
                            </div>
                            <div id="pv-timeline-container" class="flex items-center absolute inset-x-0 mx-4 translate-y-2">
                                <span id="pv-timeline-current" class="text-sm absolute left-0 select-none" v-text="videoTime_p"/>
                                <input type="range" min="0" :max="this.videoDuration" v-model="videoTime" @change="vpTimeSet" @mousedown="togglePlayer('pause')" @mouseup="togglePlayer('play')" step="0.00001"/>
                                <div id="pv-timeline-sliderbar-current"></div>
                                <span id="pv-timeline-duration" class="text-sm absolute right-0 select-none" v-text="videoDuration_p"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="postview-swf" v-else-if="post.file.ext === 'swf'">
                    <h2 class="inline-flex items-center text-2xl font-bold uppercase text-gray-600 mb-4">SWF is no supported yet</h2>
                    <p>The SWF player feature might be included on a future version of this app, sadly we don't have any plans to port it to e6Hub.</p>
                </div>
                <div v-if="this.descParsed" id="postview-description" class="bg-gray-700 p-3 rounded mt-4 break-all whitespace-pre-line">
                    <h4 class="uppercase text-gray-500 font-bold mb-1">Description</h4>
                    <span v-html="this.descParsed"></span>
                </div>
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
import * as ptime from 'pretty-ms'

export default {
    name: 'postView',
    props: [ 'post' ],
    data() {
        return {
            animatedExts: ['swf', 'webm'],
            descParsed: null,
            videoStatus: 'paused',
            videoRepeat: false,
            videoVolume: 0,
            videoPreVolume: 0,
            videoMuted: false,
            videoTime: 0,
            videoDuration: 0,
            videoTime_p: '0:00',
            videoDuration_p: '0:00'
        }
    },
    watch: {
        videoVolume(v) {
            if (this.videoMuted) document.getElementById('postview-player').muted = false
            document.getElementById('postview-player').volume = v
            document.getElementById('pv-volume-sliderbar-current').style.width = `${100 * this.videoVolume - .01}%`
        },
        videoRepeat(v) {
            document.getElementById('postview-player').loop = v
        },
        videoMuted(v) {
            if (v) {
                this.videoPreVolume = document.getElementById('postview-player').volume
                document.getElementById('postview-player').volume = 0
            } else {
                if (this.videoPreVolume == 0) this.videoPreVolume = 0.5
                document.getElementById('postview-player').volume = this.videoPreVolume
            }

            document.getElementById('postview-player').muted = v
        },
        videoTime(v) {
            try {
                document.getElementById('pv-timeline-sliderbar-current').style.width = `${v*100/this.videoDuration}%`
                this.videoTime_p = ptime(v*1000, {colonNotation: true, secondsDecimalDigits: 0, millisecondsDecimalDigits: 1000})
            } catch (e) {
                console.log('Player destroyed or failed to load')
            }
        },
        videoDuration(v) {
            this.videoDuration_p = ptime(v*1000, {colonNotation: true, secondsDecimalDigits: 0, millisecondsDecimalDigits: 1000})
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
        },
        togglePlayer(f) {
            switch (f) {
                case 'play':
                    document.getElementById('postview-player').play()
                break;
                case 'pause':
                    document.getElementById('postview-player').pause()
                break;
                default:
                    if (this.videoStatus === 'paused') document.getElementById('postview-player').play()
                    else document.getElementById('postview-player').pause()
                break;
            }
        },
        toggleRepeat() {
            if (this.videoRepeat) this.videoRepeat = false
            else this.videoRepeat = true
        },
        vpSetStatus(statusName) {
            this.videoStatus = statusName
        },
        vpVolStatus() {
            this.videoVolume = document.getElementById('postview-player').volume
        },
        vpVolToggle() {
            if (this.videoMuted) this.videoMuted = false
            else this.videoMuted = true
        },
        vpTime() {
            this.videoTime = document.getElementById('postview-player').currentTime
        },
        vpTimeSet(e) {
            document.getElementById('postview-player').currentTime = e.target.value
        },
        vpMeta() {
            this.vpVolStatus()
            this.videoDuration = document.getElementById('postview-player').duration
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.post) return this.$router.push({name: 'search'})
            DText.parse(this.post.description).then((dp) => {
                this.descParsed = dp;
            })
        })
    }
}
</script>
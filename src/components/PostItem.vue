<template>
    <div id="post_item" :id-post="id" class="flex items-center flex-col relative">
        <PLabel v-if="this.animatedExts.indexOf(ext) > -1" :e="ext"/>
        <img :src="preview_url" class="rounded"/>
        <div id="post_details" class="p-1 flex justify-center items-center w-full absolute bottom-0">
            <div id="favs" class="flex items-center ml-2 text-pink-400 pr-2">
                <feather type="heart" size="16" class="mr-1"/>
                <span>{{favs}}</span>
            </div>

            <div id="score-max" class="flex items-center ml-2 text-green-400 pr-2" v-if="score > 0">
                <feather type="arrow-up" size="16" class="mr-1"/>
                <span>{{score}}</span>
            </div>
            <div id="score-n" class="flex items-center ml-2 pr-2" v-else-if="score == 0">
                <span>{{score}}</span>
            </div>
            <div id="score-min" class="flex items-center ml-2 text-red-400 pr-2" v-else>
                <feather type="arrow-down" size="16" class="mr-1"/>
                <span>{{score}}</span>
            </div>

            <div id="rating-s" class="ml-2 text-green-400 uppercase pr-2" v-if="rating == 's'">{{rating}}</div>
            <div id="rating-q" class="ml-2 text-yellow-400 uppercase pr-2" v-else-if="rating == 'q'">{{rating}}</div>
            <div id="rating-e" class="ml-2 text-red-400 uppercase pr-2" v-else-if="rating == 'e'">{{rating}}</div>
        </div>
    </div>
</template>

<script>
import PLabel from './PostLabel.vue'

export default {
    name: 'PostItem',
    props: ['preview_url', 'rating', 'id', 'score', 'favs', 'ext'],
    components: { PLabel },
    data() {
        return {
            animatedExts: ['swf', 'gif', 'webm', 'apng']
        }
    }
}
</script>
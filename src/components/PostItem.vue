<template>
  <div
    id="post_item"
    :id-post="id"
    class="flex items-center flex-col relative"
    :class="{
      'blur': (rating === 'e' || rating === 'q') && blurNsfw,
      'unblurHover': (rating === 'e' || rating === 'q') && unblurNsfw === 'onhover',
      'w-32 h-40': viewMode === 'compact'
    }"
  >
    <PLabel v-if="this.animatedExts.indexOf(ext) > -1">{{ ext }}</PLabel>
    <div
      class="overflow-hidden rounded"
      :class="{
        'flex items-center justify-center w-32 h-40': viewMode === 'compact'
      }"
    >
      <img
        :src="preview_url"
        class="rounded"
        :class="{
          'object-cover w-full h-full': viewMode === 'compact'
        }"
      />
    </div>
    <div
      id="post_details"
      class="p-1 flex justify-center items-center w-full absolute bottom-0"
    >
      <div id="post_favs" class="flex items-center ml-2 text-pink-3 pr-2">
        <feather type="heart" size="16" class="mr-1" />
        <span v-text="favs"/>
      </div>

      <div
        id="post_score"
        class="flex items-center ml-2 pr-2"
        :class="{
          'text-green-3': score > 0,
          'text-red-3': score < 0
        }"
      >
        <feather
          v-if="score !== 0"
          :type="`arrow-${score > 0 ? 'up' : 'down'}`"
          size="16"
          class="mr-1"
        />
        <span v-text="score"/>
      </div>

      <div
        id="post_rating"
        class="ml-2 uppercase pr-2"
        :class="{
          'text-green-4': rating === 's',
          'text-orange-3': rating === 'q',
          'text-red-3': rating === 'e'
        }"
        v-text="rating"
      />
    </div>
  </div>
</template>

<script>
import PLabel from "./PostLabel.vue";
import { mapGetters } from "vuex";

export default {
  name: "PostItem",
  props: ["preview_url", "rating", "id", "score", "favs", "ext"],
  components: { PLabel },
  computed: {
    ...mapGetters("settings", ["setting"]),
    blurNsfw() {
      return this.setting("blurNsfw");
    },
    unblurNsfw() {
      return this.setting("unblurNsfw");
    },
    viewMode() {
      return this.setting("searchViewMode");
    }
  },
  data() {
    return {
      animatedExts: ["swf", "gif", "webm", "apng"],
    };
  },
};
</script>
<template>
  <button
    class="focus:outline-none cursor-default"
    :class="{
      'hover:bg-red-5': role === 'danger',
      'hover:bg-dark-7': role !== 'danger',
      'h-6 w-8': currentStyle === 'small',
      'h-8 w-12': currentStyle !== 'small',
    }"
  >
    <img :src="imgSrc" width="10" />
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TitlebarButton",
  computed: {
    ...mapGetters("settings", ["setting"]),
    currentStyle() {
      return this.setting("titlebarStyle")
    }
  },
  props: {
    role: String,
    imgSrc: String
  }
};
</script>
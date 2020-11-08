<template>
  <button
    class="focus:outline-none cursor-default"
    :class="{
      'hover:bg-red-600': role === 'danger',
      'hover:bg-gray-700': role !== 'danger',
      'h-6 w-8': currentStyle === 'small',
      'h-8 w-12': currentStyle !== 'small',
    }"
  >
    <img :src="imgSrc" width="10" />
  </button>
</template>

<script>
export default {
  name: "TitlebarButton",
  data() {
    return {
      currentStyle: this.$store.getters.setting("titlebarStyle")
    }
  },
  mounted() {
    this.$nextTick(() => {
      let self = this;
      this.$store.subscribeAction((action) => {
        if (action.type !== "setSetting") return;
        if (action.payload.key !== "titlebarStyle") return;
        
        self.currentStyle = action.payload.value;
      });
    });
  },
  props: {
    role: String,
    imgSrc: String
  }
};
</script>
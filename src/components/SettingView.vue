<template>
  <div>
    <h3
      class="text-2xl font-bold uppercase text-dark-2 mb-4"
      v-text="title"
    />
    <slot/>
  </div>
</template>

<script>
export default {
  name: "SettingView",
  props: {
    title: String
  },
};
</script>
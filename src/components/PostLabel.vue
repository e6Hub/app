<template>
  <span
    id="post_label"
    class="absolute left-0 bg-indigo-500 px-2 rounded shadow-lg uppercase z-20"
  ><slot/></span>
</template>

<script>
export default {
  name: "PostLabel"
};
</script>
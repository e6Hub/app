<template>
  <a href="#" class="text-blue-3" @click.prevent="openExternal"><slot/></a>
</template>

<script>
export default {
  name: "ExternalLink",
  methods: {
    openExternal(e) {
      require("electron").shell.openExternal(e.target.getAttribute("href"));
    }
  }
}
</script>
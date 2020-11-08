<template>
  <a href="#" class="text-indigo-300" @click.prevent="openExternal"><slot/></a>
</template>

<script>
export default {
  name: "ExternalLink",
  methods: {
    openExternal() {
      require("electron").shell.openExternal(e.target.getAttribute("href"));
    }
  }
}
</script>
<template>
  <div
    id="sidebar"
    class="w-16 bg-dark-10 inset-y-0 left-0 h-full absolute z-10 pt-4 border-r border-dark-8"
  >
    <ul id="mainlinks" class="flex flex-wrap justify-center">
      <SidebarLink icon="search" linkto="/search" />
      <SidebarLink
        icon="download"
        linkto="/downloads"
        :badgevar="this.$parent.downloadsQueue.length"
      />
      <SidebarLink icon="settings" linkto="/settings/" />
    </ul>
    <ul
      id="postslistlinks"
      v-if="this.$parent.postsList.length"
      class="flex flex-wrap justify-center border-t border-dark-7 pt-4"
    >
      <SidebarLink
        v-for="(post, index) in this.$parent.postsList"
        :key="index"
        :img="post.preview.url"
        :imgalt="post.id"
        :rating="post.rating"
        @click.native="viewPost(post)"
      />
    </ul>
  </div>
</template>

<script>
import SidebarLink from "@/components/SidebarLink.vue";

export default {
  name: "Sidebar",
  components: {
    SidebarLink,
  },
  methods: {
    viewPost(p) {
      if (!p) return;
      this.$router.push({
        name: "postView",
        params: { post: p, id: p.id },
      });
    },
  },
};
</script>
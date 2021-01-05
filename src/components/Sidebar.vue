<template>
  <div
    id="sidebar"
    class="w-16 bg-dark-10 inset-y-0 left-0 h-full absolute z-10 pt-4 border-r border-dark-8"
  >
    <ul id="mainlinks" class="flex flex-wrap justify-center">
      <SidebarLink icon="search" linkto="/search">{{$t('search.posts.search')}}</SidebarLink>
      <SidebarLink icon="layers" linkto="/searchpools">{{$t('search.pools.search')}}</SidebarLink>
      <SidebarLink
        icon="download"
        linkto="/downloads"
        :badgevar="queuePosts.filter(p => p.status === 'pending').length + queuePosts.filter(p => p.status === 'downloading').length"
      >{{$t('downloads.downloads')}}</SidebarLink>
      <SidebarLink icon="settings" linkto="/settings/">{{$t('settings.settings')}}</SidebarLink>
    </ul>
    <ul
      id="postslistlinks"
      v-if="list.length"
      class="flex flex-wrap justify-center border-t border-dark-7 pt-4"
    >
      <SidebarLink
        v-for="(post, index) in this.list"
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
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  components: {
    SidebarLink,
  },
  computed: {
    ...mapGetters("posts", ["list"]),
    ...mapGetters("downloads", ["queuePosts"]),
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
<template>
  <li id="sidebar-link" class="flex mb-3">
    <router-link
      v-if="linkto"
      :to="linkto"
      class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer duration-200 relative"
    >
      <feather :type="icon" />
      <span
        v-if="badgevar"
        id="badge"
        class="absolute bottom-0 right-0 bg-indigo-500 px-2 rounded-full text-sm"
        >{{ badgevar }}</span
      >
    </router-link>
    <div
      v-else
      class="sidebar_link_post w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer duration-200 relative overflow-hidden"
      :class="{
        'blur': (rating === 'e' || rating === 'q') && blurNsfw,
        'unblurHover': (rating === 'e' || rating === 'q') && blurNsfw && unblurNsfw === 'onhover'
      }"
    >
      <img
        class="w-12 h-12 object-cover"
        :src="img"
        :alt="imgalt"
      />
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SidebarLink",
  props: ["icon", "linkto", "badgevar", "img", "imgalt", "rating"],
  computed: {
    ...mapGetters("settings", ["setting"]),
    blurNsfw() {
      return this.setting("blurNsfw");
    },
    unblurNsfw() {
      return this.setting("unblurNsfw");
    }
  }
};
</script>
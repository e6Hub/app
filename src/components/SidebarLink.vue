<template>
  <li id="sidebar-link" class="flex mb-3 select-none relative">
    <router-link
      v-if="linkto"
      :to="linkto"
      class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-9 text-white hover:bg-gray-8 cursor-pointer duration-200 relative"
    >
      <feather :type="icon" />
      <span
        v-if="badgevar"
        id="badge"
        class="absolute bottom-0 right-0 bg-green-6 px-2 rounded-full text-sm"
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
    <div
      id="sidebar-tooltip"
      class="bg-black shadow-lg text-white rounded py-1 px-4 absolute left-full transform translate-x-2 opacity-0 w-auto whitespace-nowrap text-sm invisible duration-100 top-1/2 -translate-y-1/2"
    ><slot/></div>
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
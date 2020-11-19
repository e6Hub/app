<template>
  <li id="settings-sidebar-link" class="flex mb-1 mx-3">
    <router-link
      :to="`/settings/${linkto}`"
      class="h-10 flex items-center rounded text-dark-2 hover:bg-dark-9 hover:text-dark-1 cursor-pointer duration-100 w-full px-3"
    >
      <feather v-if="icon" :type="icon" stroke="currentColor" class="mr-3 text-dark-6" />
      <span>{{ linkname }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "SettingsSidebarLink",
  props: ["linkto", "linkname", "icon", "viewbox"],
};
</script>
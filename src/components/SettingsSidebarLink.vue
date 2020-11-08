<template>
  <li id="settings-sidebar-link" class="flex mb-1 mx-3">
    <router-link
      :to="`/settings/${linkto}`"
      class="h-10 flex items-center rounded text-gray-400 hover:bg-gray-800 hover:text-gray-100 cursor-pointer duration-200 w-full px-3"
    >
      <feather v-if="icon" :type="icon" stroke="#718096" class="mr-2" />
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
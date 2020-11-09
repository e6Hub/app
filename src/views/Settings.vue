<template>
  <div id="settings-container" class="inline-flex w-full">
    <div
      id="settings-sidebar"
      class="bg-gray-900 inset-y-0 left-0 h-full inline-block select-none"
    >
      <h4 class="text-sm font-bold uppercase text-gray-600 m-4">
        App settings
      </h4>
      <ul class="flex justify-center flex-col">
        <SettingsSidebarLink
          icon="download"
          linkto="downloads"
          linkname="Downloads"
        />
        <SettingsSidebarLink
          icon="layout"
          linkto="appearance"
          linkname="Appearance"
        />
        <SettingsSidebarLink
          icon="grid"
          linkto="plugins"
          linkname="Plugins"
        />
        <SettingsSidebarLink
          icon="info"
          linkto="about"
          linkname="About"
        />
      </ul>
    </div>
    <div id="settings-view" class="my-4 mx-2 px-4 w-full overflow-y-auto overflow-x-hidden">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import SettingsSidebarLink from "@/components/SettingsSidebarLink.vue";

export default {
  name: "settings",
  components: {
    SettingsSidebarLink,
  },
};
</script>
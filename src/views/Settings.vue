<template>
  <div id="settings-container" class="inline-flex w-full">
    <div
      id="settings-sidebar"
      class="bg-dark-10 inset-y-0 left-0 h-full inline-block select-none border-r border-dark-8 select-none"
    >
      <h4 class="text-sm font-bold uppercase text-gray-6 m-4" v-text="$t('settings.sidebar.appSettings')"/>
      <ul class="flex justify-center flex-col">
        <SettingsSidebarLink
          icon="download"
          linkto="downloads"
          linki18n="settings.sidebar.downloads"
        />
        <SettingsSidebarLink
          icon="layout"
          linkto="appearance"
          linki18n="settings.sidebar.appearance"
        />
        <SettingsSidebarLink
          icon="grid"
          linkto="plugins"
          linki18n="settings.sidebar.plugins"
        />
        <SettingsSidebarLink
          icon="globe"
          linkto="languages"
          linki18n="settings.sidebar.language"
        />
        <SettingsSidebarLink
          icon="info"
          linkto="about"
          linki18n="settings.sidebar.about"
        />
      </ul>
    </div>
    <div id="settings-view" class="my-4 mx-2 px-4 w-full overflow-y-auto overflow-x-hidden max-w-screen-xl select-none">
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
  mounted() {
    this.$router.push('/settings/downloads');
  }
};
</script>
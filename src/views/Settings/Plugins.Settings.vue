<template>
  <SettingView id="plugins-settings" title="Plugins">
    <beta-feature/>
    <div id="plugins-header" class="mt-4">
      <btn @click.native="openFolder">Open plugins folder</btn>
      <btn @click.native="refreshPlugins" role="warn" class="ml-4">Refresh plugins</btn>
    </div>
    <ul
      id="plugins-list"
      class="mt-6"
    >
      <li
        v-for="(plg, index) in this.plugins"
        :key="index"
        class="bg-gray-7 py-3 px-4 rounded-lg"
      >
        <div id="plg-header" class="flex justify-between">
          <div>
            <span id="plg-name" v-text="plg.meta.name" />
          </div>
          <div class="text-gray-3">
            <span id="plg-by" class="mr-2">by</span>
            <span id="plg-author" v-text="plg.meta.author" />
          </div>
        </div>
        <div id="plg-actions" class="mt-4">
          <btn v-if="!plg.enabled" @click.native="enablePlugin(plg.path)" role="safe">Enable</btn>
          <btn v-else @click.native="disablePlugin(plg.path)" class="ml-4">Disable</btn>
        </div>
      </li>
    </ul>
  </SettingView>
</template>

<script>
import SettingView from "@/components/SettingView.vue";
import BetaFeature from "@/components/BetaFeature.vue";
import Btn from "@/components/Button.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PluginsSettings",
  components: { SettingView, BetaFeature, Btn },
  computed: {
    ...mapGetters("plugins", ["pluginsDir", "plugins"]),
  },
  methods: {
    ...mapActions("plugins", ["clearPlugins"]),
    openFolder() {
      const { shell } = require("electron");
      shell.openItem(this.pluginsDir);
    },
    refreshPlugins() {
      this.clearPlugins();
      this.$refreshPlugins();
    },
    enablePlugin(plgPath) {
      this.$loadPlugin(plgPath);
    },
    disablePlugin(plgPath) {
      this.$unloadPlugin(plgPath);
    },
    removePlugin(plg) {
      this.$removePlugin(plg);
    },
  },
};
</script>
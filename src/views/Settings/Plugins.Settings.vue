<template>
  <SettingView id="plugins-settings" :title="$t('settings.plugins.title')">
    <beta-feature/>
    <div id="plugins-header" class="mt-4">
      <btn @click.native="openFolder">{{$t('settings.plugins.openDir')}}</btn>
      <btn @click.native="refreshPlugins" role="warn" class="ml-4">{{$t('settings.plugins.refresh')}}</btn>
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
            <span id="plg-by" class="mr-2" v-text="$t('settings.plugins.by')"/>
            <span id="plg-author" v-text="plg.meta.author" />
          </div>
        </div>
        <div id="plg-actions" class="mt-4">
          <btn v-if="!plg.enabled" @click.native="enablePlugin(plg.path)" role="safe">{{$t('settings.plugins.enable')}}</btn>
          <btn v-else @click.native="disablePlugin(plg.path)" class="ml-4">{{$t('settings.plugins.disable')}}</btn>
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
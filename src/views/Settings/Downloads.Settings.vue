<template>
  <SettingView id="downloads-settings" :title="$t('settings.downloads.title')">
    <h4 class="text-sm font-bold uppercase text-gray-3" v-text="$t('settings.downloads.currentDownloadsDir')"/>
    <btn
      id="selectDownloadLocation"
      @click.native="manageFolder"
    >{{$t('settings.downloads.manageDir')}}</btn>
    <p
      id="downloadLocation"
      name="downloadLocation"
      v-text="downloadFolder"
      class="inline-block bg-dark-10 py-2 px-4 rounded my-4 ml-4"
    />
  </SettingView>
</template>

<script>
const { dialog } = require("electron").remote;
import SettingView from "@/components/SettingView.vue";
import Btn from "@/components/Button.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DownloadsSettings",
  components: { SettingView, Btn },
  computed: {
    ...mapGetters("settings", ["setting"]),
    downloadFolder() {
      return this.setting("downloadLocation");
    },
  },
  methods: {
    ...mapActions("settings", ["setSetting"]),
    manageFolder() {
      dialog
        .showOpenDialog({
          properties: ["openDirectory"],
        })
        .then((d) => {
          if (d.canceled || !d.filePaths[0]) return;
          this.setSetting({
            key: "downloadLocation",
            value: d.filePaths[0],
          });
        })
        .catch(console.warn);
    },
  },
};
</script>
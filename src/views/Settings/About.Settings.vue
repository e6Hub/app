<template>
  <SettingView id="app-about" title="About">
    <div id="notice" class="bg-gray-700 px-4 py-2 mb-4 rounded shadow">
      <h4 class="text-xl text-gray-500 mb-2">
        e6Hub isn't an official app of e621.net
      </h4>
      <p>
        This app was created by users, not by e621's staff. If you want to
        report bug or give your feedback go to <e-link
        href="https://github.com/e6Hub/app/issues">Issues</e-link>. This app
        doesn't provide any warranty since it's open source. The
        author of the project is <e-link
        href="https://e621.net/user/show/418103">AerysSaektide</e-link>
        and it's licensed under <e-link
        href="https://raw.githubusercontent.com/e6Hub/app/master/LICENSE"
        >MIT license</e-link>.
      </p>
    </div>
    <p>{{ require("../../../package.json").version }}</p>
    <div id="e6h__about_actions" class="mt-4">
      <btn
        v-if="updateStatus == 'pendingRestart'"
        @click.native="restartForUpdate"
        role="safe"
      >Restart to update</btn>
      <btn
        v-else-if="updateStatus == 'downloading'"
        role="busy"
      >Downloading</btn>
      <btn
        v-else-if="updateStatus == 'uptodate'"
        @click.native="checkForUpdate"
      >Check for updates</btn>
      <btn
        v-else-if="updateStatus == 'checking'"
        role="disabledBusy"
      >Checking update...</btn>
      <btn
        v-else-if="updateStatus == 'dev'"
        role="disabled"
      >Development build</btn>
      <btn
        @click.native="resetSets"
        role="warn"
        class="ml-4"
      >Reset settings</btn>
    </div>
  </SettingView>
</template>

<script>
import SettingView from "@/components/SettingView.vue";
import eLink from "@/components/ExternalLink.vue"
import Btn from "@/components/Button.vue";
import { ipcRenderer } from "electron";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AboutSettings",
  components: { SettingView, eLink, Btn },
  computed: {
    ...mapGetters("updater", ["updateStatus"]),
  },
  methods: {
    ...mapActions("settings", ["resetSettings"]),
    restartForUpdate() {
      ipcRenderer.send("restartForUpdate");
    },
    checkForUpdate() {
      ipcRenderer.send("checkForUpdates");
    },
    openExternal(e) {
      e.preventDefault();
      require("electron").shell.openExternal(e.target.getAttribute("href"));
    },
    resetSets() {
      this.resetSettings();
    },
  },
};
</script>
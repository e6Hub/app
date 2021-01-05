<template>
  <SettingView id="app-about" :title="$t('settings.about.title')">
    <div id="notice" class="bg-dark-10 px-4 py-2 mb-4 rounded shadow">
      <h4 class="text-xl text-dark-2 mb-2" v-text="$t('settings.about.aboutTitle')"/>
      <i18n path="settings.about.aboutBody" tag="p">
        <a href="https://github.com/e6Hub/app/issues" v-text="$t('settings.about.aboutIssues')"/>
        <a href="https://e621.net/user/show/418103">AerysSaektide</a>
        <a href="https://raw.githubusercontent.com/e6Hub/app/master/LICENSE" v-text="$t('settings.about.aboutLicense')"/>
      </i18n>
    </div>
    <p>{{ require("../../../package.json").version }}</p>
    <div id="e6h__about_actions" class="mt-4">
      <btn
        v-if="updateStatus == 'pendingRestart'"
        @click.native="restartForUpdate"
        role="safe"
        v-text="$t('settings.about.restartToUpdate')"
      />
      <btn
        v-else-if="updateStatus == 'downloading'"
        role="busy"
        v-text="$t('settings.about.downloadingUpdate')"
      />
      <btn
        v-else-if="updateStatus == 'uptodate'"
        @click.native="checkForUpdate"
        v-text="$t('settings.about.checkForUpdate')"
      />
      <btn
        v-else-if="updateStatus == 'checking'"
        role="disabledBusy"
        v-text="$t('settings.about.checkingForUpdate')"
      />
      <btn
        v-else-if="updateStatus == 'dev'"
        role="disabled"
        v-text="$t('settings.about.devBuild')"
      />
      <btn
        @click.native="resetSets"
        role="warn"
        class="ml-4"
        v-text="$t('settings.about.resetSettings')"
      />
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
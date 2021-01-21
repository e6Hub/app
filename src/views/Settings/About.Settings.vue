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
    <div id="e6h__about_actions" class="mt-4">
      <btn
        v-if="currentUpdaterStatus"
        @click.native="currentUpdaterAction"
        :role="currentUpdaterRoleButton"
        v-text="currentUpdaterStatus"
        class="mr-4"
      />
      <btn
        @click.native="resetSets"
        role="warn"
        v-text="$t('settings.about.resetSettings')"
      />
    </div>
    <div id="e6h__about_version" class="mt-8 text-gray-6 text-center select-text">
      <i18n path="settings.about.versionDetail" tag="p">
        <span v-text="require('../../../package.json').version"/>
        <span v-text="platform.type"/>
        <span v-text="platform.release"/>
        <span v-text="platform.arch"/>
      </i18n>
    </div>
  </SettingView>
</template>

<script>
import SettingView from "@/components/SettingView.vue";
import Btn from "@/components/Button.vue";
import { ipcRenderer } from "electron";
import { mapGetters, mapActions } from "vuex";
import os from 'os';

export default {
  name: "AboutSettings",
  components: { SettingView, Btn },
  data() {
    return {
      currentUpdaterAction: null,
      currentUpdaterStatus: this.updateStatus,
      currentUpdaterRoleButton: 'disabledBusy',
      platform: {
        type: os.type(),
        arch: os.arch(),
        release: os.release()
      },

    }
  },
  computed: mapGetters("updater", ["updateStatus"]),
  watch: {
    updateStatus() {
      this.onUpdateStatus();
    }
  },
  methods: {
    ...mapActions("settings", ["resetSettings"]),
    onUpdateStatus() {
      switch (this.updateStatus) {
        case 'pendingRestart':
          this.currentUpdaterStatus = this.$t('settings.about.restartToUpdate');
          this.currentUpdaterAction = this.restartForUpdate;
          this.currentUpdaterRoleButton = 'safe';
          break;
        case 'downloading':
          this.currentUpdaterStatus = this.$t('settings.about.downloadingUpdate');
          this.currentUpdaterAction = null;
          this.currentUpdaterRoleButton = 'busy';
          break;
        case 'uptodate':
          this.currentUpdaterStatus = this.$t('settings.about.checkForUpdate');
          this.currentUpdaterAction = this.checkForUpdate;
          this.currentUpdaterRoleButton = 'normal';
          break;
        case 'checking':
          this.currentUpdaterStatus = this.$t('settings.about.checkingForUpdate');
          this.currentUpdaterAction = null;
          this.currentUpdaterRoleButton = 'disabledBusy';
          break;
        case 'dev':
          this.currentUpdaterStatus = this.$t('settings.about.devBuild');
          this.currentUpdaterAction = null;
          this.currentUpdaterRoleButton = 'disabled';
          break;
        default:
          this.currentUpdaterStatus = this.$t('settings.about.unsupportedBuild');
          this.currentUpdaterAction = null;
          this.currentUpdaterRoleButton = 'disabled';
          break;
      }
    },
    restartForUpdate() {
      ipcRenderer.send("restartForUpdate");
    },
    checkForUpdate() {
      ipcRenderer.send("checkForUpdates");
    },
    resetSets() {
      this.resetSettings();
    },
  },
  created() {
    this.onUpdateStatus();
  }
};
</script>
<template>
  <SettingView id="appearance-settings" :title="$t('settings.appearance.title')">
    <div id="appearance-settings-content">
      <section v-if="$isWindows">
        <h4 class="text-sm font-bold uppercase text-gray-3 mb-2" v-text="$t('settings.appearance.titlebarStyle')"/>
        <RadioForm
          id="appearance-topbar-style-form"
          name="topbar-style"
          :evar="currentTitlebarStyle"
          :radios="titlebarStyleOptions"
          :onChange="titlebarStyleChange"
        />
      </section>
      <section class="mt-4">
        <h4 class="text-sm font-bold uppercase text-gray-3 mb-2" v-text="$t('settings.appearance.postviews')"/>
        <Checkbox
          :evar="this.setting('blurNsfw')"
          name="enable_blurNsfw"
          :onchange="blurNsfwChange"
        >{{$t('settings.appearance.blurNsfwPosts')}}</Checkbox>
        <div v-if="this.setting('blurNsfw')" class="mt-3">
          <h4 class="text-sm font-bold uppercase text-gray-3 mb-2" v-text="$t('settings.appearance.unblurWhen')"/>
          <RadioForm
            id="appearance-unblurnsfw"
            name="unblurnsfw-when"
            :evar="this.setting('unblurNsfw')"
            :radios="unblurNsfwOptions"
            :onChange="unblurNsfwChange"
          />
        </div>
      </section>
      <section class="mt-4">
        <h4 class="text-sm font-bold uppercase text-gray-600 mb-2" v-text="$t('settings.appearance.searchviewMode')"/>
        <RadioForm
          id="appearance-searchview"
          name="searchview-mode"
          :evar="this.setting('searchViewMode')"
          :radios="searchViewModeOptions"
          :onChange="searchViewModeChange"
        />
      </section>
    </div>
  </SettingView>
</template>

<script>
import SettingView from "@/components/SettingView.vue";
import RadioForm from "@/components/RadioForm.vue";
import Checkbox from "@/components/Checkbox.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppearanceSettings",
  components: { SettingView, RadioForm, Checkbox },
  data() {
    return {
      titlebarStyleOptions: [
        {
          value: "win10",
          label: "settings.appearance.titlebar.windows10",
        },
        {
          value: "small",
          label: "settings.appearance.titlebar.small",
        },
      ],
      unblurNsfwOptions: [
        {
          value: "onhover",
          label: "settings.appearance.unblur.onhover"
        },
        {
          value: "onclick",
          label: "settings.appearance.unblur.onpostview"
        },
        {
          value: "never",
          label: "settings.appearance.unblur.never"
        },
      ],
      searchViewModeOptions: [
        {
          value: "classic",
          label: "settings.appearance.searchview.classic"
        },
        {
          value: "compact",
          label: "settings.appearance.searchview.compact"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("settings", ["setting"]),
    currentTitlebarStyle() {
      return this.setting("titlebarStyle");
    },
  },
  methods: {
    ...mapActions("settings", ["setSetting"]),
    titlebarStyleChange: function (e) {
      this.setSetting({
        key: "titlebarStyle",
        value: e.target.value,
      });
    },
    blurNsfwChange: function(e) {
      this.setSetting({
        key: "blurNsfw",
        value: e.target.checked,
      });
    },
    unblurNsfwChange: function (e) {
      this.setSetting({
        key: "unblurNsfw",
        value: e.target.value,
      });
    },
    searchViewModeChange: function (e) {
      this.setSetting({
        key: "searchViewMode",
        value: e.target.value,
      });
    },
  },
};
</script>

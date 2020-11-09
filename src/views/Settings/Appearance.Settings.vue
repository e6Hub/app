<template>
  <SettingView id="appearance-settings" title="Appearance">
    <div id="appearance-topbar-style-section">
      <section>
        <h4 class="text-sm font-bold uppercase text-gray-600 mb-2">
          Titlebar style
        </h4>
        <RadioForm
          id="appearance-topbar-style-form"
          name="topbar-style"
          :evar="currentTitlebarStyle"
          :radios="titlebarStyleOptions"
          :onChange="titlebarStyleChange"
        />
      </section>
      <section class="mt-4">
        <h4 class="text-sm font-bold uppercase text-gray-600 mb-2">
          Post views
        </h4>
        <Checkbox
          :evar="this.setting('blurNsfw')"
          name="enable_blurNsfw"
          :onchange="blurNsfwChange"
        >Blur explicit posts</Checkbox>
        <div v-if="this.setting('blurNsfw')" class="mt-3">
          <h4 class="text-sm font-bold uppercase text-gray-600 mb-2">
            Unblur when
          </h4>
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
        <h4 class="text-sm font-bold uppercase text-gray-600 mb-2">
          Search view mode
        </h4>
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
          label: "Windows 10 (Default)",
        },
        {
          value: "small",
          label: "Small",
        },
      ],
      unblurNsfwOptions: [
        {
          value: "onhover",
          label: "On hover"
        },
        {
          value: "onclick",
          label: "On post's view"
        },
        {
          value: "never",
          label: "Never"
        },
      ],
      searchViewModeOptions: [
        {
          value: "classic",
          label: "Classic view"
        },
        {
          value: "compact",
          label: "Compact view, all posts have same height and width"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["setting"]),
    currentTitlebarStyle() {
      return this.setting("titlebarStyle");
    },
  },
  methods: {
    ...mapActions(["setSetting"]),
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

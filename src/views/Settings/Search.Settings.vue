<template>
  <SettingView id="search-settings" :title="$t('settings.search.title')">
    <div id="search-settings-content">
      <section>
        <h4 class="text-sm font-bold uppercase text-gray-3 mb-2" v-text="$t('settings.search.searchMode')"/>
        <RadioForm
          id="search-mode-form"
          name="search-mode"
          :evar="currentSearchMode"
          :radios="searchModeOptions"
          :onChange="searchModeChange"
        />
      </section>
    </div>
  </SettingView>
</template>

<script>
import SettingView from "@/components/SettingView.vue";
import RadioForm from "@/components/RadioForm.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchSettings",
  components: { SettingView, RadioForm },
  data() {
    return {
      searchModeOptions: [
        {
          value: "926",
          label: "settings.search.mode.safe",
        },
        {
          value: "621",
          label: "settings.search.mode.unsafe",
        },
      ],
    }
  },
  computed: {
    ...mapGetters("settings", ["setting"]),
    currentSearchMode() {
      return this.setting("searchMode");
    },
  },
  methods: {
    ...mapActions("settings", ["setSetting"]),
    searchModeChange: function (e) {
      this.setSetting({
        key: "searchMode",
        value: e.target.value,
      });
    },
  }
};
</script>
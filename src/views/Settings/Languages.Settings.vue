<template>
  <SettingView id="languages-settings" :title="$t('settings.languages.title')">
    <div id="languages-section">
      <section>
        <h4 class="text-sm font-bold uppercase text-gray-3 mb-2" v-text="$t('settings.languages.availableLangs')"/>
        <LangSelectForm
          id="languages-form"
          name="languages-select"
          :evar="$i18n.locale"
          :langs="langOptions()"
          :onChange="langChange"
        />
      </section>
    </div>
  </SettingView>
</template>

<script>
import SettingView from "@/components/SettingView.vue";
import LangSelectForm from "@/components/LangSelectForm.vue";
import { mapActions } from "vuex";
import Vue from 'vue';

export default {
  name: "LanguagesSettings",
  components: { SettingView, LangSelectForm },
  data() {
    return {
      langOptions() {
        const appLangs = this.$i18n.messages;
        let locales = [];
        Object.keys(appLangs).forEach(langCode => {
          locales.push(
            {
              value: langCode,
              label: appLangs[langCode].langNativeName,
              flag: appLangs[langCode].langFlag
            }
          );
        })
        return locales;
      }
    };
  },
  methods: {
    ...mapActions("settings", ["setSetting"]),
    langChange: function (e) {
      Vue.set(this.$root.$i18n, 'locale', e.target.value);
      this.setSetting({
        key: "lang",
        value: e.target.value,
      });
    },
  },
};
</script>

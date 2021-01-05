import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '../store';
import en from './en';
import es from './es';

Vue.use(VueI18n);

export default new VueI18n({
  locale: store.state.settings.settings.lang,
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})
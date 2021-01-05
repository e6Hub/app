<template>
  <div
    id="e6h__beta_feature"
    class="flex items-center bg-dark-10 text-white py-3 px-5 rounded select-none"
  >
    <div class="mr-4 text-red-4">
      <feather type="alert-triangle" />
    </div>
    <div>
      <i18n path="betaWarn" tag="p">
        <a href="https://github.com/e6Hub/app/issues" v-text="$t('settings.about.aboutIssues')"/>
      </i18n>
    </div>
  </div>
</template>

<script>
import eLink from "./ExternalLink.vue";

export default {
  name: "BetaFeature",
  components: {
    eLink
  }
};
</script>
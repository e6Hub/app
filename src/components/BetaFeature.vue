<template>
  <div
    id="e6h__beta_feature"
    class="flex items-center bg-gray-900 text-gray-300 py-3 px-5 rounded"
  >
    <div class="mr-4 text-red-500">
      <feather type="alert-triangle" />
    </div>
    <div>
      This feature is experimental and may not be 100% functional, feedbacks are
      welcome at
      <e-link href="https://github.com/e6Hub/app/issues">Issues</e-link> page.
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
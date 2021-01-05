<template>
  <div class="langselectform">
    <label v-for="(lang, index) in langs" :key="index">
      <input
        type="radio"
        :name="name"
        :id="lang.value"
        :value="lang.value"
        class="hidden"
        @change="onChange"
        :checked="evar == lang.value"
      />
      <div
        id="langselectform-container"
        class="py-4 px-6 border border-gray-6 mb-2 block rounded-lg cursor-pointer flex justify-between items-center"
      >
        <div class="flex items-center">
          <div
            id="langselectform-circle"
            class="w-4 h-4 bg-gray-6 mr-6 rounded-full"
          ></div>
          <span v-text="lang.label"/>
        </div>
        <div>
          <component :is="`flag_${lang.flag}`" class="w-6"/>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
import flag_us from '../assets/flags/flag-us.svg';
import flag_es from '../assets/flags/flag-es.svg';

export default {
  name: "LangSelectForm",
  components: {
    flag_us,
    flag_es
  },
  props: {
    /**
     * The name for the radios inputs.
     */
    name: {
      type: String,
      default: "unnamedRadioInput",
    },
    /**
     * Radios inputs for the radio form.
     * @key value The value for the radio input
     * @key label The description or name for the radio input
     */
    langs: {
      type: Array,
      required: true,
    },
    /**
     * This functions gets called when a radio input changed
     * having the same "name" attribute.
     */
    onChange: {},
    /**
     * The variable to check
     */
    evar: {},
  },
};
</script>

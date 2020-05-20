<template>
    <div class="radioform" :id="id">
        <label
            v-for="(radio, index) in radios"
            :key="index">
            <input type="radio" :name="name" :id="radio.value" :value="radio.value" class="hidden" @change="onChange" :checked="evar == radio.value"/>
            <div id="radioform-container" class="py-4 px-6 border border-gray-600 mb-2 block rounded-lg cursor-pointer flex items-center">
                <div id="radioform-circle" class="w-4 h-4 bg-gray-600 mr-6 rounded-full"></div>
                <span v-text="radio.label"></span>
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: 'RadioForm',
    props: {
        /** 
         * The id for the radio form.
        */ 
        id: {
            type: String,
            default: 'unnamedRadioForm'
        },
        /**
         * The name for the radios inputs.
        */
        name: {
            type: String,
            default: 'unnamedRadioInput'
        },
        /** 
         * Radios inputs for the radio form.
         * @key value The value for the radio input
         * @key label The description or name for the radio input
        */ 
        radios: {
            type: Array,
            default: []
        },
        /**
         * This functions gets called when a radio input changed
         * having the same "name" attribute.
        */
        onChange: {},
        /**
         * The variable to check
         */
        evar: {}
    }
}
</script>
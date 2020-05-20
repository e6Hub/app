<template>
    <div id="appearance-settings">
        <h3 class="text-2xl font-bold uppercase text-gray-500 mb-4">Appearance</h3>
        <div id="appearance-topbar-style-section">
            <h4 class="text-sm font-bold uppercase text-gray-600 mb-2">Titlebar style</h4>
            <RadioForm
                id="appearance-topbar-style-form"
                name="topbar-style"
                :evar="currentTitlebarStyle"
                :radios="titlebarStyleOptions"
                :onChange="titlebarStyleChange"
            />
        </div>
    </div>
</template>

<script>
import RadioForm from '@/components/RadioForm.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'SearchSettings',
    components: { RadioForm },
    data() {
        return {
            titlebarStyleOptions: [
                {
                    value: 'win10',
                    label: 'Windows 10 (Default)'
                },
                {
                    value: 'small',
                    label: 'Small'
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['setting']),
        currentTitlebarStyle() {
            return this.setting('titlebarStyle')
        }
    },
    methods: {
        ...mapActions(['setSetting']),
        titlebarStyleChange: function(e) {
            this.setSetting({
                key: 'titlebarStyle',
                value: e.target.value
            });
        }
    }
}
</script>

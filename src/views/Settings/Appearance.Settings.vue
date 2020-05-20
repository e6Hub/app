<template>
    <div id="appearance-settings">
        <h3 class="text-2xl font-bold uppercase text-gray-500 mb-4">Appearance</h3>
        <div id="appearance-topbar-style-section">
            <h4 class="text-sm font-bold uppercase text-gray-600 mb-2">Topbar style</h4>
            <RadioForm
                id="appearance-topbar-style-form"
                name="topbar-style"
                :radios="topbarStyleOptions"
                :onChange="topbarStyleChange"
            />
        </div>
    </div>
</template>

<script>
import RadioForm from '@/components/RadioForm.vue'

export default {
    name: 'SearchSettings',
    components: { RadioForm },
    data() {
        return {
            topbarStyleOptions: [
                {
                    value: 'topbarDefault',
                    label: 'Windows 10 (Default)'
                },
                {
                    value: 'topbarSmall',
                    label: 'Small'
                },
                {
                    value: 'topbarMacOS',
                    label: 'macOS'
                }
            ]
        }
    },
    methods: {
        topbarStyleChange: function(e) {
            console.log(e.target.value);
        }
    }
}
</script>

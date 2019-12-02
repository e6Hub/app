<template>
    <div id="topbar" class="w-full bg-gray-900 h-6 text-right text-white">
        <div id="window-buttons" class="inline-block">
            <button id="minimize-app" class="focus:outline-none hover:bg-gray-700 px-2 h-6"><Icon name="minus" :w="16" :h="16"/></button>
            <button id="maximize-app" class="focus:outline-none hover:bg-gray-700 px-2 h-6"><Icon name="duplicate" :w="16" :h="16"/></button>
            <button id="close-app" class="focus:outline-none hover:bg-red-600 hover:text-white px-2 h-6"><Icon name="x" :w="16" :h="16"/></button>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: 'Titlebar',
    components: { Icon }
}
</script>
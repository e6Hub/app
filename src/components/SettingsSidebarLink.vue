<template>
    <li id="settings-sidebar-link" class="flex mb-1 mx-3">
        <router-link :to="linkto" class="h-10 flex items-center rounded text-gray-400 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-100 w-full px-3">
            <Icon v-if="icon" :name="icon" :viewbox="viewbox" class="mr-2" fill="#718096"/><span>{{linkname}}</span>
        </router-link>
    </li>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: 'SettingsSidebarLink',
    props: [ 'linkto', 'linkname', 'icon', 'viewbox' ],
    components: { Icon }
}
</script>
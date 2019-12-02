<template>
    <li id="sidebar-link" class="flex mb-3">
        <router-link v-if="linkto" :to="linkto" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-250 relative">
            <Icon :name="icon"/>
            <span v-if="badgevar" id="badge" class="absolute bottom-0 right-0 bg-indigo-500 px-2 rounded-full text-sm">{{badgevar}}</span>
        </router-link>
        <div v-else class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-250 relative overflow-hidden">
            <img :src="img" :alt="imgalt"/>
        </div>
    </li>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: 'SidebarLink',
    props: [ 'icon', 'linkto', 'badgevar', 'img', 'imgalt' ],
    components: { Icon }
}
</script>
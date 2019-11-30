<template>
    <li id="sidebar-link" class="flex mb-3">
        <router-link :to="linkto" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-250 relative">
            <i class="material-icons">{{icon}}</i>
            <span v-if="badgevar" id="downloads-badge" class="absolute bottom-0 right-0 bg-indigo-500 px-2 rounded-full text-sm">{{badgevar}}</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'SidebarLink',
    props: [ 'icon', 'linkto', 'badgevar' ]
}
</script>
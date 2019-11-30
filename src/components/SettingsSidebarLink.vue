<template>
    <li id="settings-sidebar-link" class="flex mb-1 mx-3">
        <router-link :to="linkto" class="h-10 flex items-center rounded text-gray-400 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-100 w-full router-link-exact-active router-link-active px-3">
            <span>{{linkname}}</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'SettingsSidebarLink',
    props: [ 'linkto', 'linkname' ]
}
</script>
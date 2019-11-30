<template>
    <div id="sidebar" class="w-16 bg-gray-900 inset-y-0 left-0 h-full">
        <ul class="flex flex-wrap justify-center">
            <li id="goto-search" class="flex mb-3">
                <router-link to="/search" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-250">
                    <i class="material-icons">search</i>
                </router-link>
            </li>
            <li id="goto-downloads-active" class="flex mb-3" v-if="this.$parent.downloadsQueue.length">
                <router-link to="/downloads" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-600 cursor-pointer transition-250 relative">
                    <i class="material-icons">arrow_downward</i>
                    <span id="downloads-badge" class="absolute bottom-0 right-0 bg-indigo-500 px-2 rounded-full text-sm">{{this.$parent.downloadsQueue.length}}</span>
                </router-link>
            </li>
            <li id="goto-downloads" class="flex mb-3" v-else>
                <router-link to="/downloads" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-250">
                    <i class="material-icons">arrow_downward</i>
                </router-link>
            </li>
            <li id="goto-settings" class="flex mb-3">
                <router-link to="/settings" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-250">
                    <i class="material-icons">more_horiz</i>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>
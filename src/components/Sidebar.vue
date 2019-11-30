<template>
    <div id="sidebar" class="w-16 bg-gray-900 inset-y-0 left-0 h-full">
        <ul class="flex flex-wrap justify-center">
            <SidebarLink icon="search" linkto="/search"/>
            <SidebarLink icon="arrow_downward" linkto="/downloads" :badgevar="this.$parent.downloadsQueue.length"/>
            <SidebarLink icon="more_horiz" linkto="/settings"/>
        </ul>
    </div>
</template>

<script>
import SidebarLink from '@/components/SidebarLink.vue';

export default {
    name: 'Sidebar',
    components: {
        SidebarLink
    }
}
</script>
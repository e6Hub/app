<template>
    <div id="settings-container" class="inline-flex w-full">
        <div id="settings-sidebar" class="w-64 bg-gray-900 inset-y-0 left-0 h-full inline-block select-none">
            <h4 class="text-sm font-bold uppercase text-gray-600 m-4">App settings</h4>
            <ul class="flex justify-center flex-col">
                <SettingsSidebarLink linkto="/settings/downloadsSettings" linkname="Downloads"/>
                <SettingsSidebarLink linkto="/settings/RPCSettings" linkname="Discord RPC"/>
                <SettingsSidebarLink linkto="/settings/appVersion" linkname="About"/>
            </ul>
        </div>
        <div id="settings-view" class="my-4 mx-8">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SettingsSidebarLink from '@/components/SettingsSidebarLink.vue';

export default {
    name: 'settings',
    components: {
        SettingsSidebarLink
    }
}
</script>
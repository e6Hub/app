<template>
    <div id="settings-container" class="inline-flex w-full">
        <div id="settings-sidebar" class="w-64 bg-gray-900 inset-y-0 left-0 h-full inline-block select-none">
            <h4 class="text-sm font-bold uppercase text-gray-600 m-4">App settings</h4>
            <ul class="flex justify-center flex-col">
                <li id="goto-search" class="flex mb-3 mx-3">
                    <router-link to="/settings/downloadsSettings" class="h-10 flex items-center rounded text-gray-400 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-100 w-full router-link-exact-active router-link-active px-3">
                        <span>Downloads</span>
                    </router-link>
                </li>
                <li id="goto-search" class="flex mb-3 mx-3">
                    <router-link to="/settings/RPCSettings" class="h-10 flex items-center rounded text-gray-400 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-100 w-full router-link-exact-active router-link-active px-3">
                        <span>Discord RPC</span>
                    </router-link>
                </li>
                <li id="goto-search" class="flex mb-3 mx-3">
                    <router-link to="/settings/appVersion" class="h-10 flex items-center rounded text-gray-400 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-100 w-full router-link-exact-active router-link-active px-3">
                        <span>About</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div id="settings-view" class="my-4 mx-8">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'settings'
}
</script>
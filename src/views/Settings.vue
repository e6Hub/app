<template>
    <div id="settings-container" class="inline-block w-full p-6">
        <h2 class="text-2xl font-bold uppercase text-gray-600">Settings</h2>
        <div id="app-version">
            <h3 class="text-xl font-bold uppercase text-gray-500">App version</h3>
            <p>{{require('../../package.json').version}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'settings'
}
</script>
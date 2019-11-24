<template>
    <div id="topbar" class="w-full bg-gray-900 h-6 text-right text-white">
        <div id="window-buttons" class="inline-block">
            <button id="minimize-app" class="focus:outline-none hover:bg-gray-700 px-2 h-6"><i class="material-icons text-sm">remove</i></button>
            <button id="maximize-app" class="focus:outline-none hover:bg-gray-700 px-2 h-6"><i class="material-icons text-sm">crop_din</i></button>
            <button id="close-app" class="focus:outline-none hover:bg-red-600 hover:text-white px-2 h-6"><i class="material-icons text-sm">close</i></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Titlebar'
}
</script>
<template>
    <div id="topbar" class="w-full bg-gray-900 h-8 text-right text-white">
        <div id="window-buttons" class="inline-block">
            <button id="minimize-app" class="focus:outline-none hover:bg-gray-700 py-2 px-4 h-8 cursor-default">
                <feather type="minus" size="16" stroke-width="2"/>
            </button>
            <button id="maximize-app" class="focus:outline-none hover:bg-gray-700 py-2 px-4 h-8 cursor-default">
                <feather type="copy" size="16" stroke-width="2"/>
            </button>
            <button id="close-app" class="focus:outline-none hover:bg-red-600 hover:text-white py-2 px-4 h-8 cursor-default">
                <feather type="x" size="16" stroke-width="2"/>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Titlebar'
}
</script>
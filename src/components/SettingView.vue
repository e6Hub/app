<template>
    <div :id="id">
        <h3 class="text-2xl font-bold uppercase text-gray-500 mb-4" v-text="title"></h3>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SettingView',
    props: ['id', 'title']
}
</script>
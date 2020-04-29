<template>
    <span id="post_label" class="absolute left-0 bg-indigo-500 px-2 rounded shadow-lg uppercase" v-text="e"></span>
</template>

<script>
export default {
    name: 'PostLabel',
    props: [ 'e' ]
}
</script>
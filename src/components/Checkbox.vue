<template>
  <label class="flex checkbox-label my-2">
        <div class="bg-gray-600 rounded shadow w-6 h-6 p-1 flex justify-center items-center mr-4">
            <input type="checkbox" class="hidden" :name="name" :checked="evar" @change="onChange">
            <svg class="hidden w-4 h-4 text-indigo-200 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
        </div>
        <span class="select-none"><slot></slot></span>
    </label>
</template>

<script>
export default {
    name: 'Checkbox',
    props: ['evar', 'name', 'onChange']
}
</script>
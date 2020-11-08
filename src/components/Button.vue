<template>
  <button
    class="py-2 px-4 rounded focus:outline-none shadow-lg hover:shadow-xl duration-200"
    :class="{
      'bg-orange-500': role === 'warn',
      'bg-green-500': role === 'safe',
      'bg-red-500': role === 'danger',
      'bg-gray-700': role === 'disabled',
      'bg-gray-600': role === 'disabledBusy',
      'bg-indigo-400': role === 'busy',
      'bg-indigo-500': defaultRoles.indexOf(role) === -1
    }"
  ><slot/></button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      defaultRoles: ['warn', 'safe', 'danger', 'disabled', 'disabledBusy', 'busy']
    }
  },
  props: {
    role: String
  }
}
</script>
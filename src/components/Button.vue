<template>
  <button
    class="py-2 px-4 rounded shadow-lg hover:shadow-xl duration-200"
    :class="{
      'bg-orange-5': role === 'warn',
      'bg-green-5': role === 'safe',
      'bg-red-5': role === 'danger',
      'bg-gray-5': role === 'disabled',
      'bg-gray-6': role === 'disabledBusy',
      'bg-blue-5': role === 'busy',
      'bg-blue-6': defaultRoles.indexOf(role) === -1
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
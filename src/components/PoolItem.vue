<template>
  <div
    :id="`pool_item_${pool.id}`"
    class="flex bg-dark-7 py-2 px-5 rounded shadow"
  >
    <div class="w-2/3">
      <span>{{pool.name.replace(/_/g, ' ')}}</span>
    </div>
    <div class="w-2/5 text-right">
      <span class="text-blue-4">{{pool.creator_name.replace(/_/g, ' ')}}</span>
      <span class="ml-3 text-dark-1">{{new Date(pool.updated_at).toDateString()}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoolItem',
  props: {
    pool: Object
  }
}
</script>
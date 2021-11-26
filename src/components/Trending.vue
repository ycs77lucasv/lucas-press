<template>
  <div v-if="isUp" class="flex items-center text-green-500 font-medium self-end">
    <heroicons-outline-trending-up />
    <span class="ml-1">{{ value }}{{ percentage ? '%' : '' }}</span>
  </div>
  <div v-else class="flex items-center text-red-500 font-medium self-end">
    <heroicons-outline-trending-down />
    <span class="ml-1">{{ value }}{{ percentage ? '%' : '' }}</span>
  </div>
</template>

<script>
export default {
  props: {
    isUp: {
      type: Boolean,
      default: true,
    },
    value: [Number, String],
    percentage: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

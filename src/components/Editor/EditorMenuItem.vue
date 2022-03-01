<template>
  <button
    class="mr-1 w-7 h-7 p-1 rounded"
    :class="isActive() ? 'bg-violet-600 indigo:bg-indigo-600 text-white' : 'hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white'"
    @click="action"
    :title="title"
  >
    <RemixIcon :icon="icon" />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    isActive: {
      type: Function,
      default: () => false,
    },
  },
}
</script>

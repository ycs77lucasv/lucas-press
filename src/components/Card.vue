<template>
  <div
    class="relative bg-white dark:bg-gray-700 border-gray-200 dark:border-transparent shadow"
    :class="
      stretch
        ? '-mx-6 sm:mx-0 border-t border-b sm:border sm:rounded-md'
        : 'border rounded-md'
    "
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    stretch: Boolean,
  },
}
</script>

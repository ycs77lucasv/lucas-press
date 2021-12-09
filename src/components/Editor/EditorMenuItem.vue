<template>
  <button
    class="mr-1 w-7 h-7 p-1 rounded"
    :class="isActive() ? 'bg-violet-600 text-white' : 'hover:bg-violet-600 hover:text-white'"
    @click="action"
    :title="title"
  >
    <svg class="w-full h-full fill-current">
      <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<script>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

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
  setup() {
    return { remixiconUrl }
  },
}
</script>
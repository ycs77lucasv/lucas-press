<template>
  <svg class="w-full h-full fill-current">
    <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
  </svg>
</template>

<script>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { remixiconUrl }
  },
}
</script>

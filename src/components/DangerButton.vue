<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    :class="[
      'btn text-white bg-red-500 hover:bg-red-600 focus:ring-red-500 disabled:bg-red-400',
      'dark:bg-red-600 dark:hover:bg-red-500 dark:ring-offset-gray-700',
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
import useButton from '@/composables/useButton'

export default {
  props: {
    is: String,
    type: String,
    to: String,
  },
  setup(props) {
    return { ...useButton(props) }
  },
}
</script>

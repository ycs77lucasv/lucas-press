<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    :class="[
      'btn border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-violet-500 disabled:bg-white disabled:text-gray-400',
      'indigo:focus:ring-indigo-500',
      'dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-400 dark:ring-offset-gray-700 disabled:bg-gray-700 disabled:text-gray-500',
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

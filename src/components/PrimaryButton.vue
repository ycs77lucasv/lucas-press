<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn text-white bg-violet-500 indigo:bg-indigo-500 hover:bg-violet-600 indigo:hover:bg-indigo-600 focus:ring-violet-500 indigo:focus:ring-indigo-500 disabled:bg-violet-400 indigo:disabled:bg-indigo-400"
    :disabled="loading"
  >
    <LoadingIcon v-if="loading" class="w-4 h-4 mr-1" />
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return { ...useButton(props) }
  },
}
</script>

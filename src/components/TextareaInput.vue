<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>
    <textarea
      class="form-textarea"
      :id="id"
      v-model="value"
      v-bind="$attrs"
    ></textarea>
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default {
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    id: String,
    modelValue: String,
    label: String,
    error: String,
    wrapperClass: [String, Array, Object],
  },
  setup(props) {
    const value = useVModel(props)

    return { value }
  },
}
</script>

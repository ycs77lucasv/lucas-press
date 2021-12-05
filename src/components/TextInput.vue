<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>
    <input
      :type="type"
      class="form-input"
      :id="id"
      v-model="value"
      v-bind="$attrs"
    >
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
    type: { type: String, default: 'text' },
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

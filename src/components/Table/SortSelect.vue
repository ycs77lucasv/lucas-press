<template>
  <Select v-model="selected" :options="options">
    <template #button>
      <span class="block truncate">
        排序 {{ selected === 'asc' ? 'A-Z' : 'Z-A' }}
      </span>
    </template>

    <template #option="{ option, selected }">
      <span :class="[
        selected ? 'font-medium' : 'font-normal',
        'block truncate pl-6',
      ]">
        {{ option.label }}
      </span>
      <span
        v-if="selected"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600 indigo:text-indigo-600 dark:text-violet-400"
      >
        <heroicons-outline-check class="w-5 h-5" aria-hidden="true" />
      </span>
    </template>
  </Select>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: 'asc',
    },
  },
  setup(props) {
    const selected = useVModel(props)
    const options = [
      { value: 'asc', label: 'A-Z' },
      { value: 'desc', label: 'Z-A' },
    ]

    return { selected, options }
  },
}
</script>

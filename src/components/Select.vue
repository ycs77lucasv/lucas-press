<template>
  <Listbox v-model="selected">
    <div class="relative">
      <ListboxButton class="form-select py-2 pl-4 pr-10 text-gray-600 text-left shadow">
        <slot name="button"></slot>
      </ListboxButton>

      <TransitionZoom>
        <ListboxOptions
          class="absolute z-[1] w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
          >
            <li
              class="cursor-pointer select-none relative py-2 px-4 text-gray-800 dark:text-gray-100"
              :class="{ 'bg-gray-100 dark:bg-gray-600': active }"
            >
              <slot name="option" :option="option" :selected="selected" :active="active"></slot>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </TransitionZoom>
    </div>
  </Listbox>
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
    options: Array,
  },
  setup(props) {
    const selected = useVModel(props)

    return { selected }
  },
}
</script>

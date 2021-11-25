<template>
  <Listbox v-model="selected">
    <div class="relative">
      <ListboxButton class="form-select pl-4 text-gray-600 text-left shadow">
        <span class="block truncate">
          排序 {{ selected === 'asc' ? 'A-Z' : 'Z-A' }}
        </span>
      </ListboxButton>

      <TransitionZoom>
        <ListboxOptions
          class="absolute z-[1] w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
          >
            <li
              class="cursor-pointer select-none relative py-2 pl-10 pr-4 text-gray-800"
              :class="{ 'bg-gray-100': active }"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600"
              >
                <heroicons-outline-check class="w-5 h-5" aria-hidden="true" />
              </span>
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

<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>

    <VueTagsInput
      v-model="newTag"
      :tags="tags"
      placeholder=""
      :autocomplete-items="formatAutocompleteItems"
      @tags-changed="updateTags"
    />
    
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import VueTagsInput from '@sipec/vue3-tags-input'

export default {
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    id: String,
    modelValue: Array,
    autocompleteItems: { type: Array, default: () => [] },
    label: String,
    error: String,
    wrapperClass: [String, Array, Object],
  },
  components: {
    VueTagsInput,
  },
  setup(props, { emit }) {
    const tags = props.modelValue.map(text => ({ text }))
    const newTag = ref('')

    const formatAutocompleteItems = computed(() => {
      return props.autocompleteItems
        .filter(text => text.toLowerCase().indexOf(newTag.value.toLowerCase()) !== -1)
        .map(text => ({ text }))
    })

    const updateTags = newTags => {
      emit('update:modelValue', newTags.map(tag => tag.text))
      newTag.value = ''
    }

    return { tags, newTag, formatAutocompleteItems, updateTags }
  },
}
</script>

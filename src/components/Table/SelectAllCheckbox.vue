<template>
  <input
    ref="el"
    type="checkbox"
    class="form-checkbox"
    :checked="checkboxState"
    @change="updateState"
  >
</template>

<script>
import { onMounted, ref, watch } from 'vue'

export default {
  emits: ['update:state'],
  props: {
    state: String, // 'none', 'all', 'some'
  },
  setup(props, { emit }) {
    const el = ref(null)
    const checkboxState = ref(false)

    const updateState = event => {
      emit('update:state', event.target.checked ? 'all' : 'none')
    }

    const setElementState = newState => {
      if (newState === 'none') {
        checkboxState.value = false
        el.value.indeterminate = false
      } else if (newState === 'all') {
        checkboxState.value = true
        el.value.indeterminate = false
      } else if (newState === 'some') {
        checkboxState.value = false
        el.value.indeterminate = true
      }
    }

    onMounted(() => {
      setElementState(props.state)
    })

    watch(() => props.state, newState => {
      setElementState(newState)
    })

    return { el, checkboxState, updateState }
  },
}
</script>

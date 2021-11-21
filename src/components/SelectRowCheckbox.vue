<template>
  <input
    type="checkbox"
    class="form-checkbox"
    :checked="state"
    @change="updateState"
  >
</template>

<script>
export default {
  emits: ['update:state'],
  props: {
    state: Boolean,
  },
  setup(props, { emit }) {
    const updateState = event => {
      emit('update:state', event.target.checked)
    }

    return { updateState }
  },
}
</script>

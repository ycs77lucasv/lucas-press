<template>
  <button
    type="button"
    class="inline-flex justify-center items-center w-8 h-8 text-gray-400 hover:text-red-600 transition-colors"
    @click="handleDelete"
  >
    <heroicons-outline-trash />
  </button>
</template>

<script>
import { useConfirm } from '@/composables/useConfirmModal'

export default {
  emits: ['delete'],
  props: {
    record: Object,
    confirmText: {
      type: String,
      default: '確定要執行刪除?',
    },
  },
  setup(props, { emit }) {
    const handleDelete = async () => {
      if (await useConfirm(props.confirmText)) {
        emit('delete', props.record)
      }
    }

    return { handleDelete }
  },
}
</script>

<template>
  <ConfirmModal
    v-model="showModal"
    :title="confirmTitle"
    @success="handleSuccess"
    @cancel="handleCancel"
  />
</template>

<script>
import { useConfirmModal } from '@/composables/useConfirmModal'

export default {
  setup() {
    return { ...useConfirmModal() }
  },
}
</script>

<template>
  <Layout>
    <div class="p-4">
      <DangerButton @click="deletePost">刪除</DangerButton>
    </div>
  </Layout>
</template>

<script>
import { useConfirm } from '@/composables/useConfirmModal'

export default {
  setup() {
    const deletePost = () => {
      useConfirm('確定要刪除文章嗎?').then(result => {
        if (result) {
          console.log('刪除成功')
        }
      })
    }

    return { deletePost }
  },
}
</script>

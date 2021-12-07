<template>
  <Layout>
    <div class="p-4">
      <PrimaryButton @click="showModal = true">開啟視窗</PrimaryButton>

      <ConfirmModal
        v-model="showModal"
        title="確定要刪除文章嗎?"
      />
    </div>
  </Layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showModal = ref(false)

    return { showModal }
  },
}
</script>

<template>
  <Layout>
    <div class="p-4">
      <PrimaryButton @click="open">顯示通知</PrimaryButton>
    </div>
  </Layout>
</template>

<script>
import { notify } from '@/composables/useNotification'

export default {
  setup() {
    const open = () => {
      notify('更新成功！')
    }

    return { open }
  },
}
</script>
